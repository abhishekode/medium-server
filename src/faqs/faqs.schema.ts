import type { Document, Types } from 'mongoose';
import { Schema } from 'mongoose';
import type { User } from 'src/users/users.schema';

export interface IFaqs extends Document {
	question: string;
	answer: string;
	isActive: boolean;
	admin: Types.ObjectId | User;
}

export const FaqSchema = new Schema<IFaqs>(
	{
		question: { type: String, required: true },
		answer: { type: String, required: true },
		isActive: { type: Boolean, required: true },
		admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{
		timestamps: true,
	}
);
