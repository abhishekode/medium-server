import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.schema';
import { BlogSchema } from './blogs.schema';
import { CloudinaryService } from 'src/utils/cloudinary';

@Module({
	imports: [
		ConfigModule,
		MongooseModule.forFeature([
			{ name: 'User', schema: UserSchema },
			{ name: 'Blog', schema: BlogSchema },
		]),
	],
	controllers: [BlogsController],
	providers: [BlogsService, CloudinaryService],
})
export class BlogsModule {}
