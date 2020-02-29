import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCourseComponent } from './filter-course.component';

describe('FilterCourseComponent', () => {
  let component: FilterCourseComponent;
  let fixture: ComponentFixture<FilterCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
