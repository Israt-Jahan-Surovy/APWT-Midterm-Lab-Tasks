import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CourseService } from '../course/course.service.js';
import{NotificationService} from '../notification/notification.service.js'

@Injectable()
export class EnrollmentService {
    constructor ( private courseService: CourseService, @Inject (forwardRef(() => NotificationService)) private readonly notificationService: NotificationService,){}

    enrollStudent(studentName:string, courseId:string)
    {
      const course = this.courseService.getCourseById(courseId);
      const notification = this.notificationService.sendNotification(
    studentName,
    'Welcome!'
  );
        return{
            message: "Student enrolled successfully",
            student: studentName,
            course: course,
            notification: notification
        }
    }

    getEnrollments()
    {
        return{message:"All enrollments fetched", data:[]}
    }
}
