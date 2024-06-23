import { Injectable, NotFoundException } from '@nestjs/common';
import type {
	CreateFaqDto,
	FilterFaqQuery,
	UpdateFaqDto,
} from './dto/create-faq.dto';
import type { IFaqs } from './faqs.schema';
import type { FilterQuery, Types } from 'mongoose';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { getPaginationOptions, sendResponse } from 'src/utils/commonMethods';

@Injectable()
export class FaqsService {
	constructor(
		@InjectModel('Faq')
		private readonly faqModel: Model<IFaqs>
	) {}

	private async getFaqById(faqId: Types.ObjectId) {
		const course = this.faqModel.findById(faqId);
		if (!course) {
			throw new NotFoundException('Faq not found!');
		}
		return course;
	}

	async create(createFaqDto: CreateFaqDto, admin: Types.ObjectId) {
		const newFaq = new this.faqModel({
			...createFaqDto,
			isActive: true,
			admin,
		});
		await newFaq.save();
		const data = sendResponse({
			status: true,
			result: newFaq,
			message: 'Faq created successfully',
		});
		return data;
	}

	async findAll(query: FilterFaqQuery, page = 1, size = 10) {
		const filter = this.filterFaqs(query);
		const { skip, limit } = getPaginationOptions(page, size);
		const [faqs, count] = await Promise.all([
			this.faqModel
				.find(filter)
				.limit(limit)
				.skip(skip)
				.sort({ createdAt: -1 })
				.populate({ path: 'admin', select: '_id email name' }),
			this.faqModel.countDocuments(filter),
		]);

		const data = sendResponse({
			status: true,
			result: { faqs, count },
			message: 'faqs fetched successfully',
		});
		return data;
	}

	async findOne(id: Types.ObjectId) {
		const faq = await this.getFaqById(id);

		const data = sendResponse({
			status: true,
			result: faq,
			message: 'faq fetched successfully',
		});
		return data;
	}

	async update(id: Types.ObjectId, updateFaqDto: UpdateFaqDto) {
		const faq = await this.getFaqById(id);

		Object.assign(faq, updateFaqDto);
		await faq.save();

		const data = sendResponse({
			status: true,
			result: faq,
			message: 'faq update successfully',
		});
		return data;
	}

	async remove(id: Types.ObjectId) {
		await this.getFaqById(id);
		await this.faqModel.findByIdAndDelete(id);

		const data = sendResponse({
			status: true,
			message: 'faq updated successfully',
		});
		return data;
	}

	private filterFaqs(filter: FilterFaqQuery): FilterQuery<IFaqs> {
		const query: FilterQuery<IFaqs> = {};

		if (filter.question !== undefined) {
			query.title = { $regex: filter.question, $options: 'i' };
		}

		if (filter.isActive) {
			query.isActive = filter.isActive;
		}

		return query;
	}
}
