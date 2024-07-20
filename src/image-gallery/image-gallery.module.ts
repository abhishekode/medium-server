import { Module } from '@nestjs/common';
import { ImageGalleryService } from './image-gallery.service';
import { ImageGalleryController } from './image-gallery.controller';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from 'src/utils/cloudinary';
import { SchemasModule } from 'src/schema/schema.module';

@Module({
	imports: [ConfigModule, SchemasModule],
	controllers: [ImageGalleryController],
	providers: [ImageGalleryService, CloudinaryService],
})
export class ImageGalleryModule {}
