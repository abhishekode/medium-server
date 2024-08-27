import * as Joi from 'joi';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
	IsDate,
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Max,
	Min,
} from 'class-validator';
import { ExpenseCategory } from 'src/constants/common.interface';
import { Type } from 'class-transformer';

export class CreateExpenseDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	title: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	amount: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	category: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	description: string;
}

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}

export class ExpenseFilterDto {
	@ApiPropertyOptional({ description: 'Title of the expense' })
	@IsOptional()
	@IsString()
	title?: string;

	@ApiPropertyOptional({ description: 'Category of the expense' })
	@IsOptional()
	@IsString() // Adjust this if `ExpenseCategory` is an enum or another type
	category?: string;

	@ApiPropertyOptional({ description: 'Minimum amount of the expense' })
	@IsOptional()
	@IsNumber()
	@Min(0)
	minAmount?: number;

	@ApiPropertyOptional({ description: 'Maximum amount of the expense' })
	@IsOptional()
	@IsNumber()
	@Min(0)
	maxAmount?: number;

	@ApiPropertyOptional({ description: 'Start date for filtering expenses' })
	@IsOptional()
	@IsDate()
	@Type(() => Date)
	startDate?: Date;

	@ApiPropertyOptional({ description: 'End date for filtering expenses' })
	@IsOptional()
	@IsDate()
	@Type(() => Date)
	endDate?: Date;

	@ApiPropertyOptional({ description: 'User ID associated with the expense' })
	@IsOptional()
	@IsMongoId()
	user?: string;

	@ApiPropertyOptional({ description: 'Page number for pagination' })
	@IsOptional()
	@IsNumber()
	@Min(1)
	page?: number;

	@ApiPropertyOptional({ description: 'Page size for pagination' })
	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(100)
	size?: number;
}

export const CreateExpenseSchema = Joi.object({
	title: Joi.string().required(),
	amount: Joi.number().required(),
	category: Joi.string()
		.valid(...Object.values(ExpenseCategory))
		.required(),
	description: Joi.string().required(),
});
