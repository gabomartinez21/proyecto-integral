import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { AuthService } from '../../../core/services/auth.service';
import { Course } from '../../../shared/models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {
  private courseService = inject(CourseService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  courses: Course[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.loading = true;
    this.error = '';
    console.log('loadCourses() - Iniciando peticion...');

    this.courseService.getCourses().subscribe({
      next: (courses) => {
        console.log('loadCourses() - Cursos recibidos:', courses);
        this.courses = courses;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('loadCourses() - Error recibido:', err);
        this.loading = false;
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
          return;
        } else if (err.status === 0 || err.name === 'TimeoutError') {
          this.error = 'No se puede conectar con el servidor. Verifique que la API este corriendo en http://localhost:3000';
        } else {
          this.error = err.error?.message || 'Error al cargar los cursos';
        }
        console.error('Error cargando cursos:', err);
      },
      complete: () => {
        console.log('loadCourses() - Peticion completada');
      }
    });
  }

  deleteCourse(id: string) {
    if (confirm('¿Está seguro de eliminar este curso?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          this.loadCourses();
        },
        error: (err) => {
          this.error = 'Error al eliminar el curso';
          console.error(err);
        }
      });
    }
  }
}
