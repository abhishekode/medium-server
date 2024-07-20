import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from 'src/utils/cloudinary';
import { SchemasModule } from 'src/schema/schema.module';

@Module({
	imports: [ConfigModule, SchemasModule],
	controllers: [BlogsController],
	providers: [BlogsService, CloudinaryService],
})
export class BlogsModule {}
