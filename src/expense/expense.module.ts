import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { ConfigModule } from '@nestjs/config';
import { SchemasModule } from 'src/schema/schema.module';

@Module({
	imports: [ConfigModule, SchemasModule],
	controllers: [ExpenseController],
	providers: [ExpenseService],
})
export class ExpenseModule {}
