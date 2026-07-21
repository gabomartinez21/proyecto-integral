import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../shared/models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent {
  private courseService = inject(CourseService);
  courses: Course[] = [];

  ngOnInit() {
    this.courses = this.courseService.getCourses();
  }
}
