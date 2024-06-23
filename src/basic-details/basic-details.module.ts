import { Module } from '@nestjs/common';
import { BasicDetailsService } from './basic-details.service';
import { BasicDetailsController } from './basic-details.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.schema';
import { BasicDetailSchema } from './basic-details.schema';

@Module({
	imports: [
		ConfigModule,
		MongooseModule.forFeature([
			{ name: 'User', schema: UserSchema },
			{ name: 'BasicDetails', schema: BasicDetailSchema },
		]),
	],
	controllers: [BasicDetailsController],
	providers: [BasicDetailsService],
})
export class BasicDetailsModule {}
