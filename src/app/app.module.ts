import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseComponent } from './course/course.component';
import { RatingComponent } from './rating/rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCourseComponent } from './add-course/add-course.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { FilterCourseComponent } from './filter-course/filter-course.component';
import { FilterPipe } from './filter.pipe';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { LoginComponent } from './login/login.component';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { EditCourseComponent } from './edit-course/edit-course.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseComponent,
    RatingComponent,
    AddCourseComponent,
    TopNavbarComponent,
    FilterCourseComponent,
    FilterPipe,
    CourseDetailsComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    EditCourseComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule, 
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
