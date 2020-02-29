import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../course';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input() course: Course;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isAdmin(){
    return this.authService.isAdmin();
  }

}
