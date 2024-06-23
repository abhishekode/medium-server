import type { MiddlewareConsumer } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { FaqsModule } from './faqs/faqs.module';
import { BlogsModule } from './blogs/blogs.module';
import { CoursesModule } from './courses/courses.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { ImageGalleryModule } from './image-gallery/image-gallery.module';
import { BasicDetailsModule } from './basic-details/basic-details.module';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRoot(process.env.DATABASE_URL),
		MailerModule.forRoot({
			transport: {
				host: process.env.EMAIL_HOST,
				port: 587,
				secure: false,
				auth: {
					user: process.env.EMAIL,
					pass: process.env.EMAIL_PASSWORD,
				},
			},
		}),
		UsersModule,
		CategoryModule,
		FaqsModule,
		BlogsModule,
		CoursesModule,
		TestimonialsModule,
		ImageGalleryModule,
		BasicDetailsModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {
	// let's add a middleware on all routes
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(RequestLoggerMiddleware).forRoutes('*');
	}
}
