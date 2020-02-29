import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Course, CourseType } from '../course';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  newCourse: Course;

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
    private courseService: CourseService,
    private router: Router) { }

  ngOnInit() {
    this.createForm()
  }

  createForm(){

    this.modelForm = new FormGroup({
      courseName: this.courseName = new FormControl('', [Validators.required]),
      ectsNumber: this.ectsNumber = new FormControl('', [Validators.required, Validators.min(1), Validators.max(15)]),
      semester: this.semester = new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)]),
      formOfCourse: this.formOfCourse = new FormControl('', [Validators.required]),
      maxNumberOfStudents: this.maxNumberOfStudents = new FormControl('', [Validators.required, Validators.min(1)]),
      description: this.description = new FormControl('', [Validators.required]),
      urlCourse: this.urlCourse = new FormControl('', [Validators.required, Validators.pattern("(https|http)://.+\.(?:jpg|gif|png|jpeg).*")])
    })
  }

  addCourse(){
    this.createCourse();
    this.modelForm.reset();
    this.courseService.addCourse(this.newCourse);
    this.router.navigate(['/courses']);
  }

  createCourse(){
    this.newCourse = {
      id: null,
      name: this.courseName.value,
      ECTS: this.ectsNumber.value,
      semester: this.semester.value,
      formCourse: this.formOfCourse.value,
      maxStudents: this.maxNumberOfStudents.value,
      availablePlaces: this.maxNumberOfStudents.value,
      students: [],
      ratings: [],
      image: this.urlCourse.value,
      description: this.description.value
    }
  }

  // resetForm(form: FormGroup) {

  //   form.reset();

  //   Object.keys(form.controls).forEach(key => {
  //     form.get(key).setErrors(null) ;
  //   });
  // }

}