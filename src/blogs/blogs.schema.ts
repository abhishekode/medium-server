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

// Define the schema for the Blogs collection.
export const BlogSchema = new Schema<IBlogs>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 150,
		},
		content: {
			type: String,
			required: true,
			minlength: 10,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		featuredImage: {
			type: String,
			required: true,
			trim: true,
		},
		tags: {
			type: [String],
			default: [],
		},
		claps: {
			type: Number,
			default: 0,
			min: 0,
		},
	},
	{
		timestamps: true,
	}
);

// Indexing for faster querying
BlogSchema.index({ slug: 1 });
