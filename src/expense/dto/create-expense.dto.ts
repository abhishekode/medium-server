import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import type { Types } from 'mongoose';
import type { ExpenseCategory } from 'src/constants/common.interface';

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

export interface ExpenseFilter {
	title?: string;
	category?: ExpenseCategory;
	minAmount?: number;
	maxAmount?: number;
	startDate?: Date;
	endDate?: Date;
	user?: Types.ObjectId | string;
}
