import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from 'src/blogs/blogs.schema';
import { CategorySchema } from 'src/category/category.schema';
import { IExpenseSchema } from 'src/expense/expense.schema';
import { FaqSchema } from 'src/faqs/faqs.schema';
import { ImageGallerySchema } from 'src/image-gallery/image-gallery.schema';
import { TestimonialSchema } from 'src/testimonials/testimonials.schema';
import { UserSchema } from 'src/users/users.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'User', schema: UserSchema },
			{ name: 'Blog', schema: BlogSchema },
			{ name: 'Category', schema: CategorySchema },
			{ name: 'Faq', schema: FaqSchema },
			{ name: 'ImageGallery', schema: ImageGallerySchema },
			{ name: 'Testimonial', schema: TestimonialSchema },
			{ name: 'Expense', schema: IExpenseSchema },
		]),
	],
	exports: [MongooseModule],
})
export class SchemasModule {}
