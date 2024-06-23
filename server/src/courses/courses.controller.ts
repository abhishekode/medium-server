import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	UseInterceptors,
	UploadedFile,
	Request,
	Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import {
	CreateCourseDto,
	FilterCourseQuery,
	UpdateCourseDto,
} from './dto/create-course.dto';
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
import { UserRole } from 'src/constants/common.interface';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { convertStringToObjectId } from 'src/utils/commonMethods';

@Controller('courses')
@ApiTags('courses')
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
export class CoursesController {
	constructor(private readonly coursesService: CoursesService) {}

	@Post()
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('featuredImage'))
	create(
		@Body() createCourseDto: CreateCourseDto,
		@UploadedFile() file: Express.Multer.File,
		@Request() req
	) {
		const admin = req.user.id;
		return this.coursesService.create(createCourseDto, admin, file);
	}

	@Get()
	findAll(@Query() query: FilterCourseQuery) {
		const { page, size } = query;
		return this.coursesService.findAll(query, page, size);
	}

	@Get(':slug')
	findOne(@Param('slug') slug: string) {
		return this.coursesService.findOne(slug);
	}

	@Patch(':id')
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('featuredImage'))
	update(
		@Param('id') id: string,
		@Body() updateCourseDto: UpdateCourseDto,
		@UploadedFile() file: Express.Multer.File
	) {
		const courseId = convertStringToObjectId(id);

		return this.coursesService.update(courseId, updateCourseDto, file);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	remove(@Param('id') id: string) {
		const courseId = convertStringToObjectId(id);

		return this.coursesService.remove(courseId);
	}
}
