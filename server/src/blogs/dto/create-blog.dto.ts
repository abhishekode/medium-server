import { ApiProperty, PartialType } from '@nestjs/swagger';
export class CreateBlogDto {
	@ApiProperty()
	title: string;

	@ApiProperty()
	content: string;

	@ApiProperty()
	category: string;

	@ApiProperty({ type: 'string', format: 'binary' })
	featuredImage: Express.Multer.File;
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
