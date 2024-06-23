import type { Document, Types } from 'mongoose';
import { Schema } from 'mongoose';
import type { ICategory } from 'src/category/category.schema';
import type { User } from 'src/users/users.schema';

export interface IBlogs extends Document {
	title: string;
	content: string;
	slug: string;
	author: Types.ObjectId | User;
	category: Types.ObjectId | ICategory;
	featuredImage: string;
	isPublished: boolean;
	tags: string[];
	claps: number;
}

export const BlogSchema = new Schema<IBlogs>(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		slug: { type: String, required: true },
		isPublished: { type: Boolean, default: false },
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
		featuredImage: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);
