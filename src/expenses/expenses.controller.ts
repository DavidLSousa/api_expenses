import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { FindExpensesQueryDto } from './dto/find-expenses-query.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() query: FindExpensesQueryDto) {
    return this.expensesService.findAll(
      query.month,
      query.year,
      query.category,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const expenses = await this.expensesService.findOne(id);
    if (!expenses) throw new NotFoundException();
    return expenses;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    const expenses = await this.expensesService.update(id, updateExpenseDto);
    if (!expenses) throw new NotFoundException();
    return expenses;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.expensesService.remove(id);
  }
}
