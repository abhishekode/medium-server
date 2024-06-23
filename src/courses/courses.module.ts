import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.schema';
import { CourseSchema } from './courses.schema';
import { CloudinaryService } from 'src/utils/cloudinary';

@Module({
	imports: [
		ConfigModule,
		MongooseModule.forFeature([
			{ name: 'User', schema: UserSchema },
			{ name: 'Course', schema: CourseSchema },
		]),
	],
	controllers: [CoursesController],
	providers: [CoursesService, CloudinaryService],
})
export class CoursesModule {}
