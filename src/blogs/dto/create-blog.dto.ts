import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
	IsString,
	IsNotEmpty,
	IsMongoId,
	IsOptional,
	IsArray,
	ArrayNotEmpty,
	ArrayMinSize,
	ArrayMaxSize,
} from 'class-validator';

export class CreateBlogDto {
	@ApiProperty({
		description: 'The title of the blog',
		example: 'Understanding MongoDB',
	})
	@IsString()
	@IsNotEmpty({ message: 'Title is required' })
	title: string;

	@ApiProperty({
		description: 'The content of the blog',
		example: 'This blog post discusses the basics of MongoDB...',
	})
	@IsString()
	@IsNotEmpty({ message: 'Content is required' })
	content: string;

	@ApiProperty({
		description: 'The ID of the category this blog belongs to',
		example: '60c72b2f9b1e8e5d4c8b4567',
	})
	@IsMongoId({ message: 'Category must be a valid MongoDB ObjectId' })
	@IsNotEmpty({ message: 'Category is required' })
	category: string;

	@ApiProperty({
		description: 'The featured image file for the blog',
		type: 'string',
		format: 'binary',
	})
	@IsOptional()
	featuredImage: Express.Multer.File;

	@ApiProperty({
		description: 'Tags for the blog post',
		example: ['MongoDB', 'Database', 'Backend'],
	})
	@IsArray({ message: 'Tags must be an array' })
	@ArrayNotEmpty({ message: 'Tags array must not be empty' })
	@ArrayMinSize(1, { message: 'There must be at least one tag' })
	@ArrayMaxSize(10, { message: 'There can be at most 10 tags' })
	@IsString({ each: true, message: 'Each tag must be a string' })
	@IsOptional()
	tags: string[];
}

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}

export class BlogFilter {
	@ApiProperty({ required: false })
	title?: string;

	@ApiProperty({ required: false })
	author?: string;

	@ApiProperty({ required: false })
	category?: string;

	@ApiProperty({ required: false })
	slug?: string;

	@ApiProperty({ required: false })
	page?: number;

	@ApiProperty({ required: false })
	size?: number;
}
