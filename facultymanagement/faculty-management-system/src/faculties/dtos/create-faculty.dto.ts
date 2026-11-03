import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreateFacultyDto {

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  expertise: string;

  @IsInt()
  @Min(0)
  noOfPublication: number;
}