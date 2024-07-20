import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from 'src/utils/cloudinary';
import { SchemasModule } from 'src/schema/schema.module';

@Module({
	imports: [ConfigModule, SchemasModule],
	controllers: [CategoryController],
	providers: [CategoryService, CloudinaryService],
})
export class CategoryModule {}
