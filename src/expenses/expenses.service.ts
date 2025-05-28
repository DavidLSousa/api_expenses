import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateExpenseDto) {
    return this.prisma.expense.create({ data: dto });
  }

  async findAll() {
    const allExpenses = await this.prisma.expense.findMany();
    if (!allExpenses) return null;
    return allExpenses;
  }

  findOne(id: string) {
    return this.prisma.expense.findUnique({
      where: { id },
    });
  }

  update(id: string, dto: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.prisma.expense.delete({
      where: { id },
    });
  }
}
