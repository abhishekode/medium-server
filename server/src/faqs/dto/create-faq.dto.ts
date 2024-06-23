import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateFaqDto {
	@ApiProperty()
	question: string;

	@ApiProperty()
	answer: string;

	@ApiProperty()
	isActive: boolean;
}

export class UpdateFaqDto extends PartialType(CreateFaqDto) {}

export class FilterFaqQuery {
	@ApiProperty({ required: false })
	question?: string;

	@ApiProperty({ required: false })
	page?: number;

	@ApiProperty({ required: false })
	size?: number;

	@ApiProperty({ required: false })
	isActive?: boolean;
}
