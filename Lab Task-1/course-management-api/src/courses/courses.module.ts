import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller.js';
import { CoursesService } from './courses.service.js';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports:[],
  exports:[CoursesService],
})
export class CoursesModule {}
