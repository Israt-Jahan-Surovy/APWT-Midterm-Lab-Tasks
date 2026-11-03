import { Module } from '@nestjs/common';
import { FacultiesService } from './faculties.service.js';
import { FacultiesController } from './faculties.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faculty } from './entities/faculty.entity.js';

@Module({
  controllers: [FacultiesController],
  providers: [FacultiesService],
  imports: [TypeOrmModule.forFeature([Faculty])]
})
export class FacultiesModule {}
