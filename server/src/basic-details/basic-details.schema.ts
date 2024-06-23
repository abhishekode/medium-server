import type { Document, Types } from 'mongoose';
import { Schema } from 'mongoose';

interface IOpeningHours {
	start: string;
	end: string;
}

export interface IBasicDetails extends Document {
	instituteName: string;
	description: string;
	owner: Types.ObjectId;
	contact: {
		phone: string[];
		facebook: string;
		instagram: string;
		twitter: string;
		youtube: string;
		whatsappNumber: string;
		address: string[];
	};
	openingHours: {
		monday: IOpeningHours;
		tuesday: IOpeningHours;
		wednesday: IOpeningHours;
		thursday: IOpeningHours;
		friday: IOpeningHours;
		saturday: IOpeningHours;
		sunday: IOpeningHours;
	};
}

const ContactSchema = new Schema({
	phone: [String],
	facebook: String,
	instagram: String,
	twitter: String,
	youtube: String,
	whatsappNumber: String,
	address: [String],
});

const OpeningHoursSubSchema = {
	start: { type: String },
	end: { type: String },
};

export const BasicDetailSchema = new Schema<IBasicDetails>(
	{
		instituteName: { type: String, required: true },
		description: { type: String, required: true },
		owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
		contact: { type: ContactSchema, required: true },
		openingHours: {
			monday: OpeningHoursSubSchema,
			tuesday: OpeningHoursSubSchema,
			wednesday: OpeningHoursSubSchema,
			thursday: OpeningHoursSubSchema,
			friday: OpeningHoursSubSchema,
			saturday: OpeningHoursSubSchema,
			sunday: OpeningHoursSubSchema,
		},
	},
	{
		timestamps: true,
	}
);
