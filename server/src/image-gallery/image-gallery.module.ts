import { Module } from '@nestjs/common';
import { ImageGalleryService } from './image-gallery.service';
import { ImageGalleryController } from './image-gallery.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.schema';
import { ImageGallerySchema } from './image-gallery.schema';
import { CloudinaryService } from 'src/utils/cloudinary';

@Module({
	imports: [
		ConfigModule,
		MongooseModule.forFeature([
			{ name: 'User', schema: UserSchema },
			{ name: 'ImageGallery', schema: ImageGallerySchema },
		]),
	],
	controllers: [ImageGalleryController],
	providers: [ImageGalleryService, CloudinaryService],
})
export class ImageGalleryModule {}
