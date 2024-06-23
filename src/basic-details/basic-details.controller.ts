import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Request,
	UseGuards,
} from '@nestjs/common';
import { BasicDetailsService } from './basic-details.service';
import {
	CreateBasicDetailDto,
	UpdateBasicDetailDto,
} from './dto/create-basic-detail.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/constants/common.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { convertStringToObjectId } from 'src/utils/commonMethods';
import {
	BadRequestResponse,
	NotFoundResponse,
} from 'src/constants/common.swagger';

@Controller('basic-details')
@ApiTags('basic-details')
@ApiResponse({
	status: 404,
	description: 'Not Found',
	type: NotFoundResponse,
})
@ApiResponse({
	status: 400,
	description: 'Bad Request',
	type: BadRequestResponse,
})
export class BasicDetailsController {
	constructor(private readonly basicDetailsService: BasicDetailsService) {}

	@Post()
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	create(@Body() createBasicDetailDto: CreateBasicDetailDto, @Request() req) {
		const ownerId = req.user.id;
		return this.basicDetailsService.create(createBasicDetailDto, ownerId);
	}

	@Get()
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	findAll(@Request() req) {
		const ownerId = req.user.id;

		return this.basicDetailsService.findAll(ownerId);
	}

	@Patch(':id')
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	update(
		@Param('id') id: string,
		@Body() updateBasicDetailDto: UpdateBasicDetailDto,
		@Request() req
	) {
		const ownerId = req.user.id;
		const basicDetailId = convertStringToObjectId(id);

		return this.basicDetailsService.update(
			basicDetailId,
			updateBasicDetailDto,
			ownerId
		);
	}
}
