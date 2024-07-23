import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsString,
	IsOptional,
	IsEnum,
	IsNumber,
	IsNotEmpty,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';
import { Gender } from 'src/constants/common.interface';

export class CreateUserDto {
	@ApiProperty({ example: 'john doe' })
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({ example: '+912233445566' })
	@IsString()
	@IsNotEmpty()
	phone: number;

	@ApiProperty({ example: 'johndoe@gmail.com' })
	@IsEmail({}, { message: 'Invalid email address' })
	email: string;

	@ApiProperty({ example: 'Test@12345' })
	@IsString()
	@MinLength(8, {
		message: 'Password is too short. It should be at least 8 characters long.',
	})
	@MaxLength(20, {
		message: 'Password is too long. It should not exceed 20 characters.',
	})
	@Matches(
		/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
		{
			message:
				'Password too weak. It should contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
		}
	)
	password: string;
}

export class UpdateUserDto {
	@ApiProperty({ example: 'john' })
	@IsString()
	@IsOptional()
	name: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	description: string;

	@ApiProperty({ example: Gender.Male, enum: Gender })
	@IsEnum(Gender, { message: 'Invalid gender' })
	@IsOptional()
	gender: string;

	@ApiProperty({
		type: 'string',
		format: 'binary',
		required: false,
	})
	@IsOptional()
	profileImg: Express.Multer.File;
}

export class ChangePasswordDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	oldPassword?: string;

	@ApiProperty()
	@IsString()
	@MinLength(8, {
		message: 'Password is too short. It should be at least 8 characters long.',
	})
	@MaxLength(20, {
		message: 'Password is too long. It should not exceed 20 characters.',
	})
	@Matches(
		/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
		{
			message:
				'Password too weak. It should contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
		}
	)
	newPassword: string;
}

export class LoginUserDto {
	@ApiProperty({ example: 'johndoe@gmail.com' })
	@IsEmail({}, { message: 'Invalid email address' })
	email: string;

	@ApiProperty({ example: 'Test@12345' })
	@IsString()
	@MinLength(8, {
		message: 'Password is too short. It should be at least 8 characters long.',
	})
	@MaxLength(20, {
		message: 'Password is too long. It should not exceed 20 characters.',
	})
	@Matches(
		/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
		{
			message:
				'Password too weak. It should contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
		}
	)
	password: string;
}

export class ResendOtpDto {
	@ApiProperty({ example: 'john@gmail.com' })
	@IsEmail({}, { message: 'Invalid email address' })
	email: string;
}

export class VerifyEmailOtpDto extends ResendOtpDto {
	@ApiProperty({ example: '123456' })
	@IsNumber({}, { message: 'OTP must be a number' })
	otp: number;
}

export class ChangeForgotPasswordDto {
	@ApiProperty({ example: 'john@gmail.com' })
	@IsEmail({}, { message: 'Invalid email address' })
	email: string;

	@ApiProperty()
	@IsString()
	@MinLength(8, {
		message: 'Password is too short. It should be at least 8 characters long.',
	})
	@MaxLength(20, {
		message: 'Password is too long. It should not exceed 20 characters.',
	})
	@Matches(
		/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
		{
			message:
				'Password too weak. It should contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
		}
	)
	newPassword: string;
}
