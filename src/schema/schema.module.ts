import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasicDetailSchema } from 'src/basic-details/basic-details.schema';
import { BlogSchema } from 'src/blogs/blogs.schema';
import { CategorySchema } from 'src/category/category.schema';
import { FaqSchema } from 'src/faqs/faqs.schema';
import { ImageGallerySchema } from 'src/image-gallery/image-gallery.schema';
import { TestimonialSchema } from 'src/testimonials/testimonials.schema';
import { UserSchema } from 'src/users/users.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'User', schema: UserSchema },
			{ name: 'BasicDetails', schema: BasicDetailSchema },
			{ name: 'Blog', schema: BlogSchema },
			{ name: 'Category', schema: CategorySchema },
			{ name: 'Faq', schema: FaqSchema },
			{ name: 'ImageGallery', schema: ImageGallerySchema },
			{ name: 'Testimonial', schema: TestimonialSchema },
		]),
	],
	exports: [MongooseModule],
})
export class SchemasModule {}
