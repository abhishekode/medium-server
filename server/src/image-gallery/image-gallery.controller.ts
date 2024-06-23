import {
	Controller,
	Get,
	Post,
	Param,
	Delete,
	UseGuards,
	UseInterceptors,
	UploadedFiles,
	Query,
	Body,
	Request,
} from '@nestjs/common';
import { ImageGalleryService } from './image-gallery.service';
import {
	FilterGalleryQuery,
	ImageGalleryDto,
} from './dto/create-image-gallery.dto';
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
import { FilesInterceptor } from '@nestjs/platform-express';
import { convertStringToObjectId } from 'src/utils/commonMethods';

@Controller('image-gallery')
@ApiTags('image-gallery')
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
export class ImageGalleryController {
	constructor(private readonly imageGalleryService: ImageGalleryService) {}

	@Post()
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FilesInterceptor('featuredImage'))
	create(
		@Body() createTestimonialDto: ImageGalleryDto,
		@UploadedFiles() files: Express.Multer.File[],
		@Request() req
	) {
		const admin = req.user.id;
		return this.imageGalleryService.create(files, admin);
	}

	@Get()
	findAll(@Query() query: FilterGalleryQuery) {
		const { page, size } = query;
		return this.imageGalleryService.findAll(query, page, size);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@Roles(UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	remove(@Param('id') id: string) {
		const galleryId = convertStringToObjectId(id);
		return this.imageGalleryService.remove(galleryId);
	}
}
