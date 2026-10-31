import { UpdateCourseDto } from './dtos/update-course.dto.js';
import { CreateCourseDto } from './dtos/create-course.dto.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoursesService {

    getAllCourses() {
        return {
            message: "All course fetched successfullly",
            data: [],
        }
    }
    getCourseById(id: string) {
        return {
            message: "Course fetched succeessfully", id,
        }
    }
    createCourse(dto: CreateCourseDto) {
        return {
            message: "Course created succeessfully",
            data: dto,
        };
    }
    updateCourse(id: string, dto: UpdateCourseDto) {
        return {
            message: "Course updated successfully", id,
            data: dto,
        };
    }
    patchCourse(id: string, dto: UpdateCourseDto) {
        return {
            message: "Course patched successfully", id,
            data: dto,
        };
    }
    deleteCourse(id: string) {
        return {
            message: "Course deleted successfully", id,
        }
    }
}