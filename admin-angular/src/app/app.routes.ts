import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CourseListComponent } from './features/courses/course-list/course-list.component';
import { CourseFormComponent } from './features/courses/course-form/course-form.component';
import { CourseDetailComponent } from './features/courses/course-detail/course-detail.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'courses', component: CourseListComponent, canActivate: [authGuard] },
  { path: 'courses/new', component: CourseFormComponent, canActivate: [authGuard] },
  { path: 'courses/edit/:id', component: CourseFormComponent, canActivate: [authGuard] },
  { path: 'courses/:id', component: CourseDetailComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];