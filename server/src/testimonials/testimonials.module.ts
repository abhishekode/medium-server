import { Module } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { TestimonialsController } from './testimonials.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from 'src/users/users.schema';
import { TestimonialSchema } from './testimonials.schema';
import { CloudinaryService } from 'src/utils/cloudinary';

@Module({
	imports: [
		ConfigModule,
		MongooseModule.forFeature([
			{ name: 'User', schema: UserSchema },
			{ name: 'Testimonial', schema: TestimonialSchema },
		]),
	],
	controllers: [TestimonialsController],
	providers: [TestimonialsService, CloudinaryService],
})
export class TestimonialsModule {}
