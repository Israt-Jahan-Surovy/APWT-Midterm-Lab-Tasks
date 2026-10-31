
import { Type } from 'class-transformer';
import {IsString,IsNotEmpty,IsNumber,Min,Max,IsOptional,} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  instructor: string;

  @IsNumber()
  @Min(1)
  @Max(6)
  @Type(() => Number)
  credits: number;

  @IsOptional()
  @IsString()
  description?: string;
}
