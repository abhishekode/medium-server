import * as Joi from 'joi';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CategoryDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ type: 'string', format: 'binary' })
	@ValidateNested()
	@Type(() => Object)
	featuredImage: Express.Multer.File;
}

export class UpdateCategoryDto extends PartialType(CategoryDto) {}

export const categoryJoiSchema = Joi.object({
	name: Joi.string().required(),
});
