import type { Document, Types } from 'mongoose';
import { Schema } from 'mongoose';
import type { User } from 'src/users/users.schema';

export interface ICourses extends Document {
	title: string;
	description: string;
	featuredImage: string;
	slug: string;
	isActive: boolean;
	admin: Types.ObjectId | User;
}

export const CourseSchema = new Schema<ICourses>(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true },
		description: { type: String, required: true },
		isActive: { type: Boolean, required: false, default: false },
		featuredImage: { type: String, required: true },
		admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{
		timestamps: true,
	}
);
