import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  currentRate: number;
  hovered = "";
  readonly = false;
  userAlreadyRate: boolean = false;
  userNumberRate;

  @Input() course: Course;

  constructor(
    private courseService: CourseService, 
    private authService: AuthService) { }

  ngOnInit() {
    this.currentRate = this.courseService.getAvgRatingFromCourse(this.course.id);
    this.userNumberRate = this.courseService.getUserRate(this.authService.currentUser().uid, this.course.id);
  }

  canRate(){
    return this.courseService.canRate(this.authService.currentUser().uid, this.course.id);
  }

  addRate(selectedRate: string){
    const studentID = this.authService.currentUser().uid;

    if(this.canRate()){
      this.userNumberRate = this.courseService.addRateToCourse(this.course.id, Number(selectedRate), studentID);
      this.courseService.getAvgRatingFromCourse(this.course.id);
    }
    else{
      this.userAlreadyRate = true;
      this.userNumberRate = this.courseService.getUserRate(studentID, this.course.id);
      this.currentRate = this.courseService.getAvgRatingFromCourse(this.course.id);
    }
  }


  //This method change the namber of stars after click
  onRateChange(rating: number){
    this.currentRate = this.courseService.getAvgRatingFromCourse(this.course.id);
  }

}
