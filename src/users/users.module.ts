import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from 'src/utils/cloudinary';
import { SchemasModule } from 'src/schema/schema.module';

@Module({
	imports: [
		ConfigModule,
		SchemasModule,
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: jwtConstants.expiresIn },
		}),
	],
	controllers: [UsersController],
	providers: [UsersService, CloudinaryService],
})
export class UsersModule {}
