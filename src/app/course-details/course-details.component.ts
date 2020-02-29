import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  course: Course;
  placesLeft: number;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCourse();
    this.placesLeft = this.course.availablePlaces;
  }

  getCourse(): void{
    const id = +this.route.snapshot.paramMap.get('id');


    this.course = this.courseService.getCourse(id);
  }

  goBack(): void {
    this.getCourse();
    this.location.back();
  }

  canEnroll(){
    return this.courseService.canEnrollForCourse(this.authService.currentUser().uid, this.course.id);
  }

  studentIsEnrolled(){
    return this.courseService.studentIsEnrolled(this.authService.currentUser().uid, this.course.id);
  }

  enroll(){
    this.courseService.enrollForCourse(this.authService.currentUser().uid, this.course.id);
    this.placesLeft = this.placesLeft - 1;
  }

}
