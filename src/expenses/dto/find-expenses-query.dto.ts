import { IsInt, IsOptional, Min, Max, IsString } from 'class-validator';

export class FindExpensesQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(12)
  month: string;

  @IsOptional()
  @IsInt()
  year: string;

  @IsOptional()
  @IsString()
  category: string;
}
