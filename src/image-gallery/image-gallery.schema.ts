import type { Document, Types } from 'mongoose';
import { Schema } from 'mongoose';
import type { User } from 'src/users/users.schema';

export interface IImageGallery extends Document {
	featuredImage: string;
	isActive: boolean;
	admin: Types.ObjectId | User;
}

export const ImageGallerySchema = new Schema<IImageGallery>(
	{
		featuredImage: { type: String, required: true },
		isActive: { type: Boolean, required: false, default: true },
		admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{
		timestamps: true,
	}
);
