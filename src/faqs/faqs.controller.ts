import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Request,
	Query,
} from '@nestjs/common';
import { FaqsService } from './faqs.service';
import {
	CreateFaqDto,
	FilterFaqQuery,
	UpdateFaqDto,
} from './dto/create-faq.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
	BadRequestResponse,
	NotFoundResponse,
} from 'src/constants/common.swagger';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/constants/common.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { convertStringToObjectId } from 'src/utils/commonMethods';

@Controller('faqs')
@ApiTags('faqs')
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
export class FaqsController {
	constructor(private readonly faqsService: FaqsService) {}

	@Post()
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	create(@Body() createFaqDto: CreateFaqDto, @Request() req) {
		const admin = req.user.id;
		return this.faqsService.create(createFaqDto, admin);
	}

	@Get()
	findAll(@Query() query: FilterFaqQuery) {
		const { page, size } = query;
		return this.faqsService.findAll(query, page, size);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		const faqId = convertStringToObjectId(id);

		return this.faqsService.findOne(faqId);
	}

	@Patch(':id')
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
		const faqId = convertStringToObjectId(id);
		return this.faqsService.update(faqId, updateFaqDto);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	remove(@Param('id') id: string) {
		const faqId = convertStringToObjectId(id);
		return this.faqsService.remove(faqId);
	}
}
