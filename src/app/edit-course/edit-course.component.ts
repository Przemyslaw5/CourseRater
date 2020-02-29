import { Component, OnInit } from '@angular/core';
import { Course, CourseType } from '../course';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../course.service';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  course: Course;

  modelForm: FormGroup;

  courseName: FormControl;
  ectsNumber: FormControl;
  semester: FormControl;
  formOfCourse: FormControl;
  maxNumberOfStudents: FormControl;
  description: FormControl;
  urlCourse: FormControl;

  kindOfCourse = Object.values(CourseType).slice(0,4);

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getCourse();
    this.createForm();
    this.deleteFormOfCourse();
  }

  deleteFormOfCourse() {
    const index: number = this.kindOfCourse.indexOf(this.course.formCourse);
    if (index !== -1) {
        this.kindOfCourse.splice(index, 1);
    }        
  }

  createForm(){

    this.modelForm = new FormGroup({
      courseName: this.courseName = new FormControl(this.course.name, [Validators.required]),
      ectsNumber: this.ectsNumber = new FormControl(this.course.ECTS, [Validators.required, Validators.min(1), Validators.max(15)]),
      semester: this.semester = new FormControl(this.course.semester, [Validators.required, Validators.min(1), Validators.max(10)]),
      formOfCourse: this.formOfCourse = new FormControl(this.course.formCourse, [Validators.required]),
      
      maxNumberOfStudents: this.maxNumberOfStudents = new FormControl(this.course.maxStudents, [Validators.required, Validators.min(1)]),
      description: this.description = new FormControl(this.course.description, [Validators.required]),
      urlCourse: this.urlCourse = new FormControl(this.course.image, [Validators.required, Validators.pattern("(https|http)://.+\.(?:jpg|gif|png|jpeg).*")])
    })
  }

  editCourse(){
    this.editValuesOfCourse();
    this.courseService.editCourse(this.course);
    this.createForm();
    this.goBack();
  }

  getCourse(): void{
    const id = +this.route.snapshot.paramMap.get('id');

    this.course = this.courseService.getCourse(id);
  }

  editValuesOfCourse(){
    this.course.name = this.courseName.value;
    this.course.ECTS = this.ectsNumber.value;
    this.course.semester = this.semester.value;
    this.course.formCourse = this.formOfCourse.value;
    this.course.maxStudents = this.maxNumberOfStudents.value;
    this.course.description = this.description.value;
    this.course.image = this.urlCourse.value;
  }

  goBack(): void {
    this.location.back();
  }

  deleteCourse() {
    this.courseService.deleteCourse(this.course.id);
    this.goBack();
  }

}
