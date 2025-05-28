import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  title: string;

  @IsNumber()
  amount: number;

  @IsString()
  category: string;

  @IsDateString()
  date: string;
}
