import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateExpenseDto) {
    return this.prisma.expense.create({ data: dto });
  }

  async findAll(month: string, year: string, category: string) {
    if (month && year) {
      const monthNum = parseInt(month, 10);
      const yearNum = parseInt(year, 10);

      if (isNaN(monthNum) || isNaN(yearNum) || monthNum < 1 || monthNum > 12) {
        throw new BadRequestException('Month and year must be valid numbers');
      }

      const startDate = new Date(`${year}-${month}-01T00:00:00`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

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
    await this.prisma.expense.delete({
      where: { id },
    });
  }
}
