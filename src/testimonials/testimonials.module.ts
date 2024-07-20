import { Module } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { TestimonialsController } from './testimonials.controller';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from 'src/utils/cloudinary';
import { SchemasModule } from 'src/schema/schema.module';

@Module({
	imports: [ConfigModule, SchemasModule],
	controllers: [TestimonialsController],
	providers: [TestimonialsService, CloudinaryService],
})
export class TestimonialsModule {}
