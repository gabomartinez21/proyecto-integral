import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CourseListComponent } from './features/courses/course-list/course-list.component';
import { CourseFormComponent } from './features/courses/course-form/course-form.component';
import { CourseDetailComponent } from './features/courses/course-detail/course-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/new', component: CourseFormComponent },
  { path: 'courses/edit/:id', component: CourseFormComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: '**', redirectTo: '' }
];