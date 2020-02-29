import { Rating } from './rating'

export enum CourseType{
    Lecture = "Lecture",
    Exercise = "Exercise",
    Laboratory = "Laboratory",
    Project = "Project",
}

export interface Course{
    id: number;
    name: string;
    ECTS: number;
    semester: number;
    formCourse: CourseType;
    maxStudents: number;
    availablePlaces: number;
    students: string[];
    ratings: Rating[];
    image: string;
    description: string;
}

