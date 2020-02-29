import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CourseFilterData } from './filter.pipe';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterObject = new Subject<any>();

  constructor() { }

  getActualFilters() : Observable<any> {
    return this.filterObject.asObservable();
  }

  updateFilters(courseFilters: CourseFilterData): void {
    this.filterObject.next(courseFilters);
  }
}
