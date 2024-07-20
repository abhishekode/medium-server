import { Module } from '@nestjs/common';
import { BasicDetailsService } from './basic-details.service';
import { BasicDetailsController } from './basic-details.controller';
import { ConfigModule } from '@nestjs/config';
import { SchemasModule } from 'src/schema/schema.module';

@Module({
	imports: [ConfigModule, SchemasModule],
	controllers: [BasicDetailsController],
	providers: [BasicDetailsService],
})
export class BasicDetailsModule {}
