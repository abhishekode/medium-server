import type { Document, Types } from 'mongoose';
import { Schema } from 'mongoose';
import { ExpenseCategory } from 'src/constants/common.interface';
import type { User } from 'src/users/users.schema';

export interface IExpense extends Document {
	title: string;
	category: ExpenseCategory;
	amount: number;
	description?: string;
	user: Types.ObjectId | User;
}

export const IExpenseSchema = new Schema<IExpense>(
	{
		title: { type: String, required: true },
		category: {
			type: String,
			enum: Object.values(ExpenseCategory),
			required: true,
		},
		amount: { type: Number, required: true },
		description: { type: String },
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{
		timestamps: true,
	}
);
