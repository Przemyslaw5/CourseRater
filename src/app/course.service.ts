import { Injectable } from '@angular/core';
import { Course, CourseType } from './course'
import { AngularFireDatabase } from '@angular/fire/database';
import { Rating } from './rating';
import { of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses: Object;
  private idToCourse :number;

  constructor(private db: AngularFireDatabase) {
    this.getIdToCourse().subscribe(id => this.idToCourse = id);
    this.getCourses().subscribe(courses => this.courses=courses);
  }

  getIdToCourse(): Observable<any>{
    return this.db.list('idToCourse').valueChanges();
  }

  getCourses(): Observable<any>{
    return this.db.list('courses').valueChanges();
  }

  getCourse(id: number){
    return Object.values(this.courses).filter(course => {return course.id == id})[0];
  }

  deleteCourse(id: number){
    this.db.list('courses/' + String(id)).remove();
  }

  editCourse(course: Course){ 

    this.db.list('courses/' + course.id).set('name',  course.name);
    this.db.list('courses/' + course.id).set('ECTS',  course.ECTS);
    this.db.list('courses/' + course.id).set('semester',  course.semester);
    this.db.list('courses/' + course.id).set('formCourse',  course.formCourse);
    this.db.list('courses/' + course.id).set('maxStudents',  course.maxStudents);
    this.db.list('courses/' + course.id).set('availablePlaces',  course.maxStudents - (course.students.length - 1));
    this.db.list('courses/' + course.id).set('description',  course.description);
    this.db.list('courses/' + course.id).set('image',  course.image);
  }

  canEnrollForCourse(user: string, id: number){
    const course = Object.values(this.courses).filter(course => {return course.id == id})[0];
    if(course.students === undefined) return true;
    if(!(course.students.length - 1 < course.maxStudents)) return false;
    for(var i = 1; i < course.students.length; i++){
      if(course.students[String(i)] === user) {
        return false;
      }
    }
    return true;
  }

  studentIsEnrolled(user: string, id: number){
    const course = Object.values(this.courses).filter(course => {return course.id == id})[0];
    if(course.students === undefined) return false;
    for(var i = 1; i < course.students.length; i++){
      if(course.students[String(i)] === user) {
        return true;
      }
    }
    return false;
  }

  enrollForCourse(user: string, id: number){
    const course = Object.values(this.courses).filter(course => {return course.id == id})[0];
    let students: number;
    if(course.students === undefined) students = 1;
    else students = course.students.length;

    this.db.list('courses/' + id + '/students').set(String(students),  user);
    this.db.list('courses/' + id).set('availablePlaces',  course.availablePlaces - 1);
  }

  canRate(user: string, id: number){
    const course = Object.values(this.courses).filter(course => {return course.id == id})[0];

    if(course.ratings === undefined) return true;

    for(var i = 1; i < course.ratings.length; i++){
      if(course.ratings[String(i)].studentID === user) return false;
    }

    return true;
  }

  getAvgRatingFromCourse(id: number){
    const course = Object.values(this.courses).filter(course => {return course.id == id})[0];

    if(course.ratings === undefined) return 0;

    var sum = 0;
    course.ratings.forEach(element => {
      sum += element.rating;
    });
    return Math.round(100 * (sum / (course.ratings.length - 1))) / 100; // Najpierw mnoże przez 10 aby zaokrąglić do całośći a potem dzielę żeby mieć części dziesiętne
  }

  addRateToCourse(id: number, rate: number, user: string){
    const course = Object.values(this.courses).filter(course => {return course.id == id})[0];

    const Rating = {
      rating: rate,
      studentID: user
    };

    let rates: number;
    if(course.ratings === undefined) rates = 1;
    else rates = course.ratings.length;

    this.db.list('courses/' + id + '/ratings').set(String(rates),  Rating);
    return Rating.rating;
  }

  getUserRate(user: string, id: number){
    const course = Object.values(this.courses).filter(course => {return course.id == id})[0];

    if(course.ratings === undefined) return "";
    
    for(var i = 1; i < course.ratings.length; i++){
      if(course.ratings[String(i)].studentID === user) return course.ratings[String(i)].rating.toString();
    }

    return "";
  }

  addCourse(course: Course){
    let id: number;
    if(this.idToCourse[0] === undefined) id = 1;
    else id = this.idToCourse[0] + 1
    course.id = id;

    this.db.list('courses').set(String(id), course);
    this.db.list('idToCourse').set('idToCourse',id);
  }
}
