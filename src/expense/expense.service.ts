import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { FilterQuery } from 'mongoose';
import { Model, Types } from 'mongoose';
import type { IExpense } from './expense.schema';
import type {
	CreateExpenseDto,
	ExpenseFilter,
	UpdateExpenseDto,
} from './dto/create-expense.dto';
import { getPaginationOptions, sendResponse } from 'src/utils/commonMethods';

@Injectable()
export class ExpenseService {
	constructor(
		@InjectModel('Expense') private readonly expenseModel: Model<IExpense>
	) {}

	async create(
		createExpenseDto: CreateExpenseDto,
		userId: string
	): Promise<IExpense> {
		const createdExpense = new this.expenseModel({
			...createExpenseDto,
			user: userId,
		});
		const savedExpense = await createdExpense.save();
		const data = sendResponse({
			status: true,
			result: savedExpense,
			message: 'Expense created successfully',
		});
		return data;
	}

	async findAll(
		query: ExpenseFilter,
		page = 1,
		size = 10
	): Promise<IExpense[]> {
		const filter = this.filterExpense(query);
		const { skip, limit } = getPaginationOptions(page, size);

		const [expense, count] = await Promise.all([
			this.expenseModel
				.find(filter)
				.limit(limit)
				.skip(skip)
				.sort({ createdAt: -1 })
				.populate('user', '_id email name'),
			this.expenseModel.countDocuments(filter),
		]);
		const data = sendResponse({
			status: true,
			result: { expense, count },
			message: 'Expense fetched successfully',
		});
		return data;
	}

	async findOne(id: string, userId: string): Promise<IExpense | null> {
		const expense = await this.expenseModel.findById(id).exec();
		if (!expense) {
			throw new NotFoundException(`Cannot find expense ${id}`);
		}
		if (expense.user.toString() !== userId) {
			throw new ForbiddenException(
				'You are not authorized to access this expense'
			);
		}
		const data = sendResponse({
			status: true,
			result: expense,
			message: 'Expense fetched successfully',
		});
		return data;
	}

	async update(
		id: string,
		updateExpenseDto: UpdateExpenseDto,
		userId: string
	): Promise<IExpense | null> {
		const expense = await this.expenseModel.findById(id).exec();
		if (!expense) {
			throw new NotFoundException(`Cannot find expense ${id}`);
		}
		if (expense.user.toString() !== userId) {
			throw new ForbiddenException(
				'You are not authorized to access this expense'
			);
		}
		Object.assign(expense, updateExpenseDto);
		await expense.save();
		const data = sendResponse({
			status: true,
			message: 'Expense updated successfully',
		});
		return data;
	}

	async remove(id: string, userId: string): Promise<IExpense | null> {
		const expense = await this.expenseModel.findById(id).exec();
		if (!expense) {
			throw new NotFoundException(`Cannot find expense ${id}`);
		}
		if (expense.user.toString() !== userId) {
			throw new ForbiddenException(
				'You are not authorized to access this expense'
			);
		}
		await this.expenseModel.findByIdAndDelete(id).exec();
		const data = sendResponse({
			status: true,
			message: 'Expense updated successfully',
		});
		return data;
	}

	filterExpense(filter: ExpenseFilter): FilterQuery<IExpense> {
		const query: FilterQuery<IExpense> = {};

		const { title, category, minAmount, maxAmount, startDate, endDate, user } =
			filter;

		if (title) {
			query.title = { $regex: title, $options: 'i' };
		}

		if (category) {
			query.category = category;
		}

		if (minAmount !== undefined) {
			query.amount = { ...query.amount, $gte: minAmount };
		}

		if (maxAmount !== undefined) {
			query.amount = { ...query.amount, $lte: maxAmount };
		}

		if (startDate) {
			query.date = { ...query.date, $gte: startDate };
		}

		if (endDate) {
			query.date = { ...query.date, $lte: endDate };
		}

		if (user) {
			query.user =
				user instanceof Types.ObjectId ? user : new Types.ObjectId(user);
		}

		return query;
	}
}
