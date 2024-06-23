import { Injectable, NotFoundException } from '@nestjs/common';
import type {
	CreateCourseDto,
	FilterCourseQuery,
	UpdateCourseDto,
} from './dto/create-course.dto';
import type { ICourses } from './courses.schema';
import { InjectModel } from '@nestjs/mongoose';
import type { FilterQuery, Types } from 'mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/utils/cloudinary';
import { getPaginationOptions, sendResponse } from 'src/utils/commonMethods';
import slugify from 'slugify';

@Injectable()
export class CoursesService {
	constructor(
		@InjectModel('Course')
		private readonly courseModel: Model<ICourses>,
		private cloudinaryService: CloudinaryService
	) {}

	private async getCourseById(courseId: Types.ObjectId) {
		const course = await this.courseModel.findById(courseId);
		if (!course) {
			throw new NotFoundException('Course not found!');
		}
		return course;
	}

	async create(
		createCourseDto: CreateCourseDto,
		admin: Types.ObjectId,
		file: Express.Multer.File
	) {
		const slug = slugify(createCourseDto.title, { lower: true });
		let featuredImage = '';

		if (file?.originalname) {
			const images = await this.cloudinaryService.uploadImage(file, 'course');
			featuredImage = images.url;
		}
		const newCourse = new this.courseModel({
			...createCourseDto,
			featuredImage,
			slug,
			admin,
		});
		await newCourse.save();

		const data = sendResponse({
			status: true,
			result: newCourse,
			message: 'New Course created successfully',
		});
		return data;
	}

	async findAll(query: FilterCourseQuery, page = 1, size = 10) {
		const filter = this.filterCourses(query);
		const { skip, limit } = getPaginationOptions(page, size);
		const [courses, count] = await Promise.all([
			this.courseModel
				.find(filter)
				.limit(limit)
				.skip(skip)
				.sort({ createdAt: -1 })
				.populate({ path: 'admin', select: '_id email name' }),
			this.courseModel.countDocuments(filter),
		]);

		const data = sendResponse({
			status: true,
			result: { courses, count },
			message: 'course fetched successfully',
		});
		return data;
	}

	async findOne(slug: string) {
		const course = await this.courseModel.findOne({ slug });
		if (!course) {
			throw new NotFoundException('Course not found!');
		}
		const data = sendResponse({
			status: true,
			result: course,
			message: 'course fetched successfully',
		});
		return data;
	}

	async update(
		id: Types.ObjectId,
		updateCourseDto: UpdateCourseDto,
		file: Express.Multer.File
	) {
		const course = await this.getCourseById(id);
		Object.assign(course, updateCourseDto);

		if (file?.originalname) {
			if (course.featuredImage) {
				await this.cloudinaryService.deleteImageByUrl(course.featuredImage);
			}
			const images = await this.cloudinaryService.uploadImage(file, 'course');
			updateCourseDto.featuredImage = images.url;
		}
		if (updateCourseDto.title) {
			const slug = slugify(updateCourseDto.title, { lower: true });
			course.slug = slug;
		}

		await course.save();
		const data = sendResponse({
			status: true,
			message: 'course updated successfully',
		});
		return data;
	}

	async remove(id: Types.ObjectId) {
		const course = await this.getCourseById(id);
		if (course.featuredImage) {
			await this.cloudinaryService.deleteImageByUrl(course.featuredImage);
		}
		await this.courseModel.findByIdAndDelete(id);
		const data = sendResponse({
			status: true,
			message: 'course updated successfully',
		});
		return data;
	}

	private filterCourses(filter: FilterCourseQuery): FilterQuery<ICourses> {
		const query: FilterQuery<ICourses> = {};

		if (filter.title !== undefined) {
			query.title = { $regex: filter.title, $options: 'i' };
		}

		if (filter.isActive) {
			query.isActive = filter.isActive;
		}

		return query;
	}
}
