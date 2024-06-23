import { ApiProperty } from '@nestjs/swagger';

export class ImageGalleryDto {
	@ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
	featuredImages: Express.Multer.File[];
}

export class FilterGalleryQuery {
	@ApiProperty({ required: false })
	page?: number;

	@ApiProperty({ required: false })
	size?: number;

	@ApiProperty({ required: false })
	isActive?: boolean;
}
