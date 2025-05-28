import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateExpenseDto) {
    return this.prisma.expense.create({ data: dto });
  }

  async findAll(month?: number, year?: number, category?: string) {
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);

      return this.prisma.expense.findMany({
        where: {
          date: {
            gte: startDate,
            lt: endDate,
          },
        },
      });
    }

    if (category) {
      return this.prisma.expense.findMany({
        where: { category },
      });
    }

    return this.prisma.expense.findMany();
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
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }

    await this.prisma.expense.delete({ where: { id } });
  }
}
