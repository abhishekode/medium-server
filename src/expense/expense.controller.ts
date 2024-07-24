import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Request,
	Query,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import {
	CreateExpenseDto,
	ExpenseFilter,
	UpdateExpenseDto,
} from './dto/create-expense.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
	BadRequestResponse,
	NotFoundResponse,
} from 'src/constants/common.swagger';
import { UserRole } from 'src/constants/common.interface';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('expense')
@ApiTags('expense')
@ApiResponse({
	status: 404,
	description: 'Not Found',
	type: NotFoundResponse,
})
@ApiResponse({
	status: 400,
	description: 'Bad Request',
	type: BadRequestResponse,
})
export class ExpenseController {
	constructor(private readonly expenseService: ExpenseService) {}

	@Post()
	@ApiBearerAuth()
	@Roles(UserRole.Admin, UserRole.Student)
	@UseGuards(AuthGuard, RolesGuard)
	create(@Body() createExpenseDto: CreateExpenseDto, @Request() req) {
		const userId = req.user.id;

		return this.expenseService.create(createExpenseDto, userId);
	}

	@Get()
	@ApiBearerAuth()
	@Roles(UserRole.Admin, UserRole.Student)
	@UseGuards(AuthGuard, RolesGuard)
	findAll(@Query() query: ExpenseFilter, @Request() req) {
		const userId = req.user.id;
		const queryWithUser = { ...query, userId: userId };
		return this.expenseService.findAll(queryWithUser);
	}

	@Get(':id')
	@ApiBearerAuth()
	@Roles(UserRole.Admin, UserRole.Student)
	@UseGuards(AuthGuard, RolesGuard)
	findOne(@Param('id') id: string, @Request() req) {
		const userId = req.user.id;
		return this.expenseService.findOne(id, userId);
	}

	@Patch(':id')
	@ApiBearerAuth()
	@Roles(UserRole.Admin, UserRole.Student)
	@UseGuards(AuthGuard, RolesGuard)
	update(
		@Param('id') id: string,
		@Body() updateExpenseDto: UpdateExpenseDto,
		@Request() req
	) {
		const userId = req.user.id;

		return this.expenseService.update(id, updateExpenseDto, userId);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@Roles(UserRole.Admin, UserRole.Student)
	@UseGuards(AuthGuard, RolesGuard)
	remove(@Param('id') id: string, @Request() req) {
		const userId = req.user.id;
		return this.expenseService.remove(id, userId);
	}
}
