import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCourseDto {
	@ApiProperty()
	title: string;

	@ApiProperty()
	description: string;

	@ApiProperty({ type: 'string', format: 'binary' })
	featuredImage: Express.Multer.File;

	@ApiProperty({ required: false })
	isActive: boolean;
}

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}

export class FilterCourseQuery {
	@ApiProperty({ required: false })
	title?: string;

	@ApiProperty({ required: false })
	page?: number;

	@ApiProperty({ required: false })
	size?: number;

	@ApiProperty({ required: false })
	isActive?: boolean;
}
