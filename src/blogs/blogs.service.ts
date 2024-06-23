import { Injectable, NotFoundException } from '@nestjs/common';
import type {
	BlogFilter,
	CreateBlogDto,
	UpdateBlogDto,
} from './dto/create-blog.dto';
import slugify from 'slugify';
import { InjectModel } from '@nestjs/mongoose';
import type { FilterQuery, Types } from 'mongoose';
import { Model } from 'mongoose';
import type { IBlogs } from './blogs.schema';
import { getPaginationOptions, sendResponse } from 'src/utils/commonMethods';
import { CloudinaryService } from 'src/utils/cloudinary';

@Injectable()
export class BlogsService {
	constructor(
		@InjectModel('Blog')
		private readonly blogModel: Model<IBlogs>,
		private cloudinaryService: CloudinaryService
	) {}

	async create(
		createBlogDto: CreateBlogDto,
		file: Express.Multer.File,
		author: Types.ObjectId
	) {
		const slug = slugify(createBlogDto.title, { lower: true });
		let featuredImage = '';

		if (file?.originalname) {
			const images = await this.cloudinaryService.uploadImage(file, 'blog');
			featuredImage = images.url;
		}

		const blog = new this.blogModel({
			...createBlogDto,
			slug,
			featuredImage,
			author,
		});

		await blog.save();

		const data = sendResponse({
			status: true,
			result: blog,
			message: 'New blog created successfully',
		});
		return data;
	}

	async findBlogByQuery(query: FilterQuery<IBlogs>) {
		const blog = await this.blogModel
			.findOne(query)
			.populate('author', '_id email name');
		if (!blog) {
			throw new NotFoundException('Blog not found');
		}
		return blog;
	}

	async findAll(query: BlogFilter, page = 1, size = 10) {
		const filter = this.filterBlogs(query);
		const { skip, limit } = getPaginationOptions(page, size);

		const [blogs, count] = await Promise.all([
			this.blogModel
				.find(filter)
				.limit(limit)
				.skip(skip)
				.sort({ createdAt: -1 })
				.populate('author', '_id email name')
				.populate('category'),
			this.blogModel.countDocuments(filter),
		]);
		const data = sendResponse({
			status: true,
			result: { blogs, count },
			message: 'blog fetched successfully',
		});
		return data;
	}

	async findOne(slug: string) {
		const blog = await this.findBlogByQuery({ slug });

		const data = sendResponse({
			status: true,
			result: blog,
			message: 'blog update successfully',
		});
		return data;
	}

	async update(
		id: Types.ObjectId,
		updateBlogDto: UpdateBlogDto,
		author: Types.ObjectId,
		file: Express.Multer.File
	) {
		const blog = await this.findBlogByQuery({ _id: id, author });

		if (file?.originalname) {
			if (blog.featuredImage) {
				await this.cloudinaryService.deleteImageByUrl(blog.featuredImage);
			}
			const images = await this.cloudinaryService.uploadImage(file, 'blog');
			blog.featuredImage = images.url;
		}

		Object.assign(blog, updateBlogDto);

		if (updateBlogDto.title) {
			const slug = slugify(updateBlogDto.title, { lower: true });
			blog.slug = slug;
		}

		await blog.save();

		const data = sendResponse({
			status: true,
			message: 'blog update successfully',
		});
		return data;
	}

	async remove(id: Types.ObjectId, author: Types.ObjectId) {
		await this.findBlogByQuery({ _id: id, author });
		await this.blogModel.findByIdAndDelete(id);

		const data = sendResponse({
			status: true,
			message: 'blog deleted successfully',
		});
		return data;
	}

	filterBlogs(filter: BlogFilter): FilterQuery<IBlogs> {
		const query: FilterQuery<IBlogs> = {};
		const { author, category, title, slug } = filter;

		if (title) {
			query.title = { $regex: title, $options: 'i' };
		}

		if (author) {
			query.author = author;
		}

		if (category) {
			query.category = category;
		}

		if (slug) {
			query.slug = { $regex: slug, $options: 'i' };
		}

		return query;
	}
}
