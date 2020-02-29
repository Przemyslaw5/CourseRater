import { Component, OnInit } from '@angular/core';
import { CourseFilterData } from '../filter.pipe';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-filter-course',
  templateUrl: './filter-course.component.html',
  styleUrls: ['./filter-course.component.css']
})
export class FilterCourseComponent implements OnInit {

  filterObject: CourseFilterData = {
    name2: null,
    minects: null,
    maxects: null,
    semester: null,
    minrate: null,
    maxrate: null
  }

  constructor(private filterService: FilterService) { }


  sendFilters() : void {
    this.filterService.updateFilters(this.filterObject);
  }

  resetFilters(){
    this.filterObject.name2 = null;
    this.filterObject.minects = null;
    this.filterObject.maxects = null;
    this.filterObject.semester = null;
    this.filterObject.minrate = null;
    this.filterObject.maxrate = null;
    this.sendFilters();
  }

  ngOnInit() {
  }

}
