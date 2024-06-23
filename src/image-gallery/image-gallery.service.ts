import { Injectable } from '@nestjs/common';
import type { FilterGalleryQuery } from './dto/create-image-gallery.dto';
import { InjectModel } from '@nestjs/mongoose';
import type { IImageGallery } from './image-gallery.schema';
import type { FilterQuery, Types } from 'mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/utils/cloudinary';
import { getPaginationOptions } from 'src/utils/commonMethods';

@Injectable()
export class ImageGalleryService {
	constructor(
		@InjectModel('ImageGallery')
		private readonly imageGalleryModel: Model<IImageGallery>,
		private cloudinaryService: CloudinaryService
	) {}

	private sendResponse(data: any, message: string) {
		return {
			status: true,
			message,
			result: data,
		};
	}

	async create(files: Express.Multer.File[], admin: string) {
		if (!files.length) {
			return this.sendResponse(
				null,
				'Please select at least one image to upload'
			);
		}

		const uploadPromises = files.map(async (file) => {
			const image = await this.cloudinaryService.uploadImage(file, 'gallery');
			return image.url;
		});
		const images = await Promise.all(uploadPromises);

		const gallery = images.map((image) => {
			return {
				featuredImage: image,
				admin: admin,
				isActive: true,
			};
		});
		const newGallery = this.imageGalleryModel.create(gallery);
		return this.sendResponse(newGallery, 'New gallery created successfully');
	}

	async findAll(query: FilterGalleryQuery, page = 1, size = 10) {
		const filter = this.filterGallery(query);
		const { skip, limit } = getPaginationOptions(page, size);
		const [gallery, count] = await Promise.all([
			this.imageGalleryModel
				.find(filter)
				.limit(limit)
				.skip(skip)
				.sort({ createdAt: -1 })
				.populate('admin', 'email name'),
			this.imageGalleryModel.countDocuments(filter),
		]);
		return this.sendResponse(
			{ gallery, count },
			'Categories fetched successfully'
		);
	}

	async remove(id: Types.ObjectId) {
		const gallery = await this.imageGalleryModel.findById(id);

		if (gallery.featuredImage) {
			await this.cloudinaryService.deleteImageByUrl(gallery.featuredImage);
		}

		await this.imageGalleryModel.findByIdAndDelete(id);
		return this.sendResponse(null, 'gallery deleted successfully');
	}

	private filterGallery(
		filter: FilterGalleryQuery
	): FilterQuery<IImageGallery> {
		const query: FilterQuery<IImageGallery> = {};

		if (filter.isActive) {
			query.isActive = filter.isActive;
		}

		return query;
	}
}
