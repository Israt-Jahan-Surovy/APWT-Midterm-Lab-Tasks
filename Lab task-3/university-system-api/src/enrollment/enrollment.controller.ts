import { Controller } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service.js';
import { Get,Post,Body } from '@nestjs/common';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}
  @Get()
  getEnrollments()
  {
    return this.enrollmentService.getEnrollments();
  }

  @Post()
  enrollStudent(@Body('studentName') studentName: string, @Body('courseId') courseId: string)
  {
    return this.enrollmentService.enrollStudent(studentName,courseId);
  }

}
