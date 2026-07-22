import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../shared/models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-detail.component.html',
  styleUrl: './course.detail.css'
})
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);

  course: Course | null = null;
  loading = true;
  error = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseService.getCourseById(id).subscribe({
        next: (course) => {
          this.course = course;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar el curso';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  deleteCourse() {
    if (this.course?.id && confirm('¿Está seguro de eliminar este curso?')) {
      this.courseService.deleteCourse(this.course.id).subscribe({
        next: () => {
          this.router.navigate(['/courses']);
        },
        error: (err) => {
          this.error = 'Error al eliminar el curso';
          console.error(err);
        }
      });
    }
  }
}
