
//import { NotificationService } from './notification.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service.js';

@Injectable()
export class NotificationService {
   constructor(
      @Inject(forwardRef(() => EnrollmentService))
      private readonly enrollmentService: Pick<EnrollmentService, 'getEnrollments'>,
   ) {}

    sendNotification(studentName: string, message: string)
    {
        return{
            message:"Notification sent successfully",
            student: studentName,
            note: message,
        }
    }

    checkEnrollmentAndNotify(studentName: string, courseId: string)
    {
        const enrollment= this.enrollmentService.getEnrollments();
        return{
            message: "Enrollment Status checked",
            student: studentName, courseId, enrollment
        }


}
}
