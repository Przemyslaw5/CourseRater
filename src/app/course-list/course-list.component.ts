import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service'
import { CourseFilterData } from '../filter.pipe';
import { FilterService } from '../filter.service';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[];

  private filterObject: CourseFilterData;

  constructor(private courseService: CourseService, private filterService: FilterService) { }


  ngOnInit() {
    this.getCourses();
    this.getFilters();
  }

  getFilters(){
    this.filterService.getActualFilters()
      .subscribe(filterObject => this.filterObject = filterObject);
  }

  getCourses():void{
    this.courseService.getCourses().subscribe(
      courses => this.courses = courses
    );
  }

}
