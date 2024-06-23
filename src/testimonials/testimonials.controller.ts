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
	UseInterceptors,
	UploadedFile,
} from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import {
	CreateTestimonialDto,
	FilterTestimonialQuery,
	UpdateTestimonialDto,
} from './dto/create-testimonial.dto';
import {
	ApiBearerAuth,
	ApiConsumes,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import {
	BadRequestResponse,
	NotFoundResponse,
} from 'src/constants/common.swagger';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/constants/common.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { convertStringToObjectId } from 'src/utils/commonMethods';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('testimonials')
@ApiTags('testimonials')
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
export class TestimonialsController {
	constructor(private readonly testimonialsService: TestimonialsService) {}

	@Post()
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('featuredImage'))
	create(
		@Body() createTestimonialDto: CreateTestimonialDto,
		@Request() req,
		@UploadedFile() file: Express.Multer.File
	) {
		const admin = req.user.id;
		return this.testimonialsService.create(createTestimonialDto, admin, file);
	}

	@Get()
	findAll(@Query() query: FilterTestimonialQuery) {
		const { page, size } = query;
		return this.testimonialsService.findAll(query, page, size);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		const testimonialId = convertStringToObjectId(id);
		return this.testimonialsService.findOne(testimonialId);
	}

	@Patch(':id')
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	update(
		@Param('id') id: string,
		@Body() updateTestimonialDto: UpdateTestimonialDto
	) {
		const testimonialId = convertStringToObjectId(id);
		return this.testimonialsService.update(testimonialId, updateTestimonialDto);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	remove(@Param('id') id: string) {
		const testimonialId = convertStringToObjectId(id);
		return this.testimonialsService.remove(testimonialId);
	}
}
