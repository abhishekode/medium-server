import { Module } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { FaqsController } from './faqs.controller';
import { ConfigModule } from '@nestjs/config';
import { SchemasModule } from 'src/schema/schema.module';

@Module({
	imports: [ConfigModule, SchemasModule],
	controllers: [FaqsController],
	providers: [FaqsService],
})
export class FaqsModule {}
