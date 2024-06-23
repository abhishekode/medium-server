import { ApiProperty, PartialType } from '@nestjs/swagger';

interface IOpeningHours {
	start: string;
	end: string;
}
export class CreateBasicDetailDto {
	@ApiProperty({
		description: 'Name of the institute',
		example: 'Example Institute',
	})
	readonly instituteName: string;

	@ApiProperty({
		description: 'Description of the institute',
		example: 'Example Description',
	})
	readonly description: string;

	@ApiProperty({
		description: 'Contact information',
		example: {
			phone: ['1234567890'],
			facebook: 'example_facebook',
			instagram: 'example_instagram',
			twitter: 'example_twitter',
			youtube: 'example_youtube',
			whatsappNumber: '1234567890',
			address: ['Example Address'],
		},
	})
	readonly contact: {
		readonly phone: string[];
		readonly facebook: string;
		readonly instagram: string;
		readonly twitter: string;
		readonly youtube: string;
		readonly whatsappNumber: string;
		readonly address: string[];
	};

	@ApiProperty({
		description: 'Opening hours of the institute',
		example: {
			monday: { start: '9:00 AM', end: '5:00 PM' },
			tuesday: { start: '9:00 AM', end: '5:00 PM' },
			wednesday: { start: '9:00 AM', end: '5:00 PM' },
			thursday: { start: '9:00 AM', end: '5:00 PM' },
			friday: { start: '9:00 AM', end: '5:00 PM' },
			saturday: { start: '9:00 AM', end: '1:00 PM' },
			sunday: { start: '', end: '' },
		},
	})
	readonly openingHours: { [key: string]: IOpeningHours };
}

export class UpdateBasicDetailDto extends PartialType(CreateBasicDetailDto) {}
