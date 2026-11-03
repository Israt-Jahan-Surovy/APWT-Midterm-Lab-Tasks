import { Injectable,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faculty } from './entities/faculty.entity.js';
import { CreateFacultyDto } from './dtos/create-faculty.dto.js';
@Injectable()
export class FacultiesService {
    constructor(@InjectRepository(Faculty) private readonly facultyRepo: Repository<Faculty>,){}

    async createFaculty(faculty: CreateFacultyDto) : Promise<Faculty>{
    try {
      const facultyEntity = await this.facultyRepo.create(faculty);
      return await this.facultyRepo.save(facultyEntity);
    } catch {
      throw new BadRequestException('Failed to create instance');
    }
  }
}
