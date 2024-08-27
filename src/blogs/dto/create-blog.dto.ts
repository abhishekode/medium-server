import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsString,
	IsNotEmpty,
	IsMongoId,
	IsOptional,
	IsArray,
	ArrayNotEmpty,
	ArrayMinSize,
	ArrayMaxSize,
	ValidateIf,
	IsBoolean,
	IsNumber,
	IsPositive,
	Min,
	Max,
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
		required: true,
		description: 'Tags for the blog post',
		example: ['MongoDB', 'Database', 'Backend'],
	})
	@ValidateIf((o) => {
		return Array.isArray(o.tags);
	})
	@IsArray({ message: 'Tags must be an array' })
	@ArrayNotEmpty({ message: 'Tags array must not be empty' })
	@ArrayMinSize(1, { message: 'There must be at least one tag' })
	@ArrayMaxSize(10, { message: 'There can be at most 10 tags' })
	@IsString({ each: true, message: 'Each tag must be a string' })
	tags: string[];

	// add isPublished
	@ApiProperty({ required: false })
	@IsOptional()
	@IsBoolean()
	isPublished: boolean;
}

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}

export class BlogFilter {
	@ApiProperty({ required: false, description: 'Filter by blog title' })
	@IsOptional()
	@IsString()
	title?: string;

	@ApiProperty({ required: false, description: 'Filter by author name' })
	@IsOptional()
	@IsString()
	author?: string;

	@ApiProperty({ required: false, description: 'Filter by blog category' })
	@IsOptional()
	@IsString()
	category?: string;

	@ApiProperty({ required: false, description: 'Filter by blog slug' })
	@IsOptional()
	@IsString()
	slug?: string;

	@ApiProperty({ required: false, description: 'Page number for pagination' })
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@IsPositive()
	page?: number;

	@ApiProperty({ required: false, description: 'Page size for pagination' })
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@IsPositive()
	@Min(1)
	@Max(100)
	size?: number;
}
