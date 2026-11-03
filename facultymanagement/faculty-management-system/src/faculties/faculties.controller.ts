import { Controller,Post,Body } from '@nestjs/common';
import { FacultiesService } from './faculties.service.js';
import { CreateFacultyDto } from './dtos/create-faculty.dto.js';

@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  @Post('create-faculty')
  createFaculty(@Body() faculty: CreateFacultyDto)
  {
     return this.facultiesService.createFaculty(faculty);
  }
}
