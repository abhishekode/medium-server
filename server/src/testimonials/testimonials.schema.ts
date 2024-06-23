import type { Document, Types } from 'mongoose';
import { Schema } from 'mongoose';
import type { User } from 'src/users/users.schema';

export interface ITestimonial extends Document {
	name: string;
	comments: string;
	isActive: boolean;
	rating: number;
	admin: Types.ObjectId | User;
	featuredImage: string;
}

export const TestimonialSchema = new Schema<ITestimonial>(
	{
		name: { type: String, required: true },
		comments: { type: String, required: true },
		isActive: { type: Boolean, required: false, default: false },
		rating: { type: Number, required: true },
		featuredImage: { type: String, required: true },
		admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{
		timestamps: true,
	}
);
