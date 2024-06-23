import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTestimonialDto {
	@ApiProperty()
	name: string;
	@ApiProperty()
	comments: string;
	@ApiProperty()
	isActive: boolean;
	@ApiProperty()
	rating: number;
	@ApiProperty({ type: 'string', format: 'binary' })
	featuredImage: Express.Multer.File;
}
export class UpdateTestimonialDto extends PartialType(CreateTestimonialDto) {}

export class FilterTestimonialQuery {
	@ApiProperty({ required: false })
	page?: number;

	@ApiProperty({ required: false })
	size?: number;

	@ApiProperty({ required: false })
	name?: string;

	@ApiProperty({ required: false })
	isActive?: boolean;

	@ApiProperty({ required: false })
	minRating?: number;

	@ApiProperty({ required: false })
	maxRating?: number;
}
