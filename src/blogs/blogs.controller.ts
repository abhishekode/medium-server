import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UseGuards,
	Request,
	Query,
	UseInterceptors,
	UploadedFile,
	Put,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import {
	BlogFilter,
	CreateBlogDto,
	UpdateBlogDto,
} from './dto/create-blog.dto';
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
import { convertStringToObjectId } from 'src/utils/commonMethods';
import { FileInterceptor } from '@nestjs/platform-express';
import { JoiValidationPipe } from 'src/middleware/validation.pipe';
import { CreateBlogSchema, UpdateBlogSchema } from './dto/validate-blog.dto';

@Controller('blogs')
@ApiTags('Blogs')
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
export class BlogsController {
	constructor(private readonly blogsService: BlogsService) {}

	@Post()
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('featuredImage'))
	create(
		@Body(new JoiValidationPipe(CreateBlogSchema)) createBlogDto: CreateBlogDto,
		@UploadedFile() file: Express.Multer.File,
		@Request() req
	) {
		const author = req.user.id;
		return this.blogsService.create(createBlogDto, file, author);
	}

	@Get()
	findAll(@Query() query: BlogFilter) {
		const { page, size } = query;
		return this.blogsService.findAll(query, page, size);
	}

	@Get(':slug')
	findOne(@Param('slug') slug: string) {
		return this.blogsService.findOne(slug);
	}

	@Put(':id')
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('featuredImage'))
	update(
		@Param('id') id: string,
		@Body(new JoiValidationPipe(UpdateBlogSchema)) updateBlogDto: UpdateBlogDto,
		@Request() req,
		@UploadedFile() file: Express.Multer.File
	) {
		const author = req.user.id;
		const blogId = convertStringToObjectId(id);
		return this.blogsService.update(blogId, updateBlogDto, author, file);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	remove(@Param('id') id: string, @Request() req) {
		const author = req.user.id;
		const blogId = convertStringToObjectId(id);
		return this.blogsService.remove(blogId, author);
	}
}
