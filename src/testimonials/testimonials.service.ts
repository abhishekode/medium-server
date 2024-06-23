import { Injectable, NotFoundException } from '@nestjs/common';
import type {
	CreateTestimonialDto,
	FilterTestimonialQuery,
	UpdateTestimonialDto,
} from './dto/create-testimonial.dto';
import { InjectModel } from '@nestjs/mongoose';
import type { FilterQuery, Types } from 'mongoose';
import { Model } from 'mongoose';
import type { ITestimonial } from './testimonials.schema';
import { getPaginationOptions, sendResponse } from 'src/utils/commonMethods';
import { CloudinaryService } from 'src/utils/cloudinary';

@Injectable()
export class TestimonialsService {
	constructor(
		@InjectModel('Testimonial')
		private readonly testimonialModel: Model<ITestimonial>,
		private cloudinaryService: CloudinaryService
	) {}

	private async getTestimonialById(testimonialId: Types.ObjectId) {
		const testimonial = this.testimonialModel.findById(testimonialId);
		if (!testimonial) {
			throw new NotFoundException('Testimonial not found!');
		}
		return testimonial;
	}

	async create(
		createTestimonialDto: CreateTestimonialDto,
		admin: Types.ObjectId,
		file: Express.Multer.File
	) {
		let featuredImage = '';

		if (file?.originalname) {
			const images = await this.cloudinaryService.uploadImage(file, 'course');
			featuredImage = images.url;
		}
		const newTestimonial = new this.testimonialModel({
			...createTestimonialDto,
			featuredImage,
			admin,
		});
		await newTestimonial.save();
		const data = sendResponse({
			status: true,
			result: newTestimonial,
			message: 'Testimonial created successfully',
		});
		return data;
	}

	async findAll(query: FilterTestimonialQuery, page = 1, size = 10) {
		const filter = this.filterTestimonials(query);
		const { skip, limit } = getPaginationOptions(page, size);
		const [testimonials, count] = await Promise.all([
			this.testimonialModel
				.find(filter)
				.limit(limit)
				.skip(skip)
				.sort({ createdAt: -1 })
				.populate('admin', 'email name'),
			this.testimonialModel.countDocuments(filter),
		]);

		const data = sendResponse({
			status: true,
			result: { testimonials, count },
			message: 'Testimonials fetched successfully',
		});
		return data;
	}

	async findOne(id: Types.ObjectId) {
		const testimonial = await this.getTestimonialById(id);

		const data = sendResponse({
			status: true,
			result: testimonial,
			message: 'testimonial fetched successfully',
		});
		return data;
	}

	async update(id: Types.ObjectId, updateDto: UpdateTestimonialDto) {
		const testimonial = await this.getTestimonialById(id);

		Object.assign(testimonial, updateDto);
		await testimonial.save();

		const data = sendResponse({
			status: true,
			result: testimonial,
			message: 'testimonial update successfully',
		});
		return data;
	}

	async remove(id: Types.ObjectId) {
		await this.getTestimonialById(id);
		await this.testimonialModel.findByIdAndDelete(id);

		const data = sendResponse({
			status: true,
			message: 'testimonial updated successfully',
		});
		return data;
	}

	private filterTestimonials(
		filter: FilterTestimonialQuery
	): FilterQuery<ITestimonial> {
		const query: FilterQuery<ITestimonial> = {};

		if (filter.name !== undefined) {
			query.title = { $regex: filter.name, $options: 'i' };
		}

		if (filter.isActive) {
			query.isActive = filter.isActive;
		}
		if (filter.minRating) {
			query.rating = { $gte: filter.minRating };
		}
		if (filter.maxRating) {
			query.rating = { $lte: filter.maxRating };
		}

		return query;
	}
}
