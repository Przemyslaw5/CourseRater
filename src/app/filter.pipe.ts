import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './course';

export interface CourseFilterData{
  name2: String;
  minects: number;
  maxects: number;
  semester: number;
  minrate: number;
  maxrate: number;
}


@Pipe({
  name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {

  transform(courses: Course[], filter: CourseFilterData): Course[] {
    if (!courses) {
      return [];
    }

    if (!filter) {
      return courses;
    }

    if(filter.name2){
      courses = courses.filter(course => 
        course.name.toUpperCase().includes(filter.name2.toUpperCase())
      );
    }

    if(filter.minects){
      courses = courses.filter(course =>
        course.ECTS >= filter.minects)
    }

    if(filter.maxects){
      courses = courses.filter(course =>
        course.ECTS <= filter.maxects)
    }

    if(filter.semester){
      courses = courses.filter(course =>
        course.semester == filter.semester)
    }

    if(filter.minrate){
      courses = courses.filter(course => {
        let sum = 0;
        let number = 0;
        course.ratings.forEach(rate => {
          sum += rate.rating;
          number++;
        });
        const rate =  Math.round(10 * (sum / number)) / 10;
        return(rate >= filter.minrate);
      });
    }

    if(filter.maxrate){
      courses = courses.filter(course => {
        let sum = 0;
        let number = 0;
        course.ratings.forEach(rate => {
          sum += rate.rating;
          number++;
        });
        const rate =  Math.round(10 * (sum / number)) / 10;
        return(rate <= filter.maxrate);
      });
    }

    return courses;

  }
  

}
