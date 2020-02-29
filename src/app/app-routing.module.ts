import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseListComponent } from './course-list/course-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { AddCourseComponent } from './add-course/add-course.component';


const routes: Routes = [
  {
    path: 'courses/add',
    component: AddCourseComponent,
    canActivate: [AdminGuard],
    children: []
  },
  {
    path: 'courses',
    component: CourseListComponent,
    canActivate: [AuthGuard],
    children: []
  },
  {
    path: 'courses/:id',
    component: CourseDetailsComponent,
    canActivate: [AuthGuard],
    children: []
  },
  {
    path: 'courses/edit/:id',
    component: EditCourseComponent,
    canActivate: [AdminGuard],
    children: []
  },
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: RegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }