import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import type {
	CreateBasicDetailDto,
	UpdateBasicDetailDto,
} from './dto/create-basic-detail.dto';
import { InjectModel } from '@nestjs/mongoose';
import type { Types } from 'mongoose';
import { Model } from 'mongoose';
import type { IBasicDetails } from './basic-details.schema';
import { sendResponse } from 'src/utils/commonMethods';

@Injectable()
export class BasicDetailsService {
	constructor(
		@InjectModel('BasicDetails')
		private readonly basicDetailsModel: Model<IBasicDetails>
	) {}

	private async getBasicDetailById(
		basicDetailId: Types.ObjectId,
		ownerId: string
	): Promise<IBasicDetails | null> {
		const basicDetail = await this.basicDetailsModel.findById(basicDetailId);
		if (!basicDetail) {
			throw new NotFoundException('Basic details not found');
		}
		if (basicDetail.owner.toString() !== ownerId) {
			throw new ForbiddenException(
				'You are not allowed to access this information'
			);
		}
		return basicDetail;
	}

	async create(
		createBasicDetailDto: CreateBasicDetailDto,
		ownerId: Types.ObjectId
	): Promise<IBasicDetails> {
		const checkBasicDetailExists = await this.basicDetailsModel.countDocuments({
			owner: ownerId,
		});
		if (checkBasicDetailExists > 0) {
			throw new ForbiddenException(
				'Basic details already exists, please delete it or update it'
			);
		}
		const createdBasicDetail = new this.basicDetailsModel({
			...createBasicDetailDto,
			owner: ownerId,
		});
		const savedBasicDetail = createdBasicDetail.save();
		const data = sendResponse({
			status: true,
			result: savedBasicDetail,
			message: 'Basic Detail added successfully',
		});
		return data;
	}

	async findAll(ownerId: Types.ObjectId): Promise<IBasicDetails | null> {
		const basicDetail = await this.basicDetailsModel
			.findOne({ owner: ownerId })
			.exec();
		const data = sendResponse({
			status: true,
			result: basicDetail,
			message: 'Basic Detail fetched successfully',
		});
		return data;
	}

	async update(
		id: Types.ObjectId,
		updateBasicDetailDto: UpdateBasicDetailDto,
		ownerId: string
	): Promise<IBasicDetails | null> {
		const details = await this.getBasicDetailById(id, ownerId);
		Object.assign(details, updateBasicDetailDto);
		await details.save();
		const data = sendResponse({
			status: true,
			message: 'Basic Detail updated successfully',
		});
		return data;
	}
}
