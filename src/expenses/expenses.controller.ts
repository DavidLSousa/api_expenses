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
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  findAll(
    @Query('month') month: string,
    @Query('year') year: string,
    @Query('category') category: string,
  ) {
    return this.expensesService.findAll(month, year, category);
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
    try {
      await this.expensesService.remove(id);
    } catch {
      throw new NotFoundException();
    }
  }
}
