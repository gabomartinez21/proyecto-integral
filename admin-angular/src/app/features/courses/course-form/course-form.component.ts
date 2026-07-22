import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../core/services/course.service';
import { CourseCreate } from '../../../shared/models/course.model';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.css'
})
export class CourseFormComponent implements OnInit {
  private courseService = inject(CourseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  isEdit = false;
  loading = false;
  loadingCourse = false;
  error = '';
  courseId = '';

  course: CourseCreate = this.emptyCourse();

  private emptyCourse(): CourseCreate {
    return {
      nombre: '',
      categoria: '',
      docente: '',
      modalidad: 'presencial',
      duracionHoras: 0,
      vacantes: 0,
      costo: 0,
      fechaInicio: '',
      activo: true,
      descripcion: ''
    };
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.courseId = id;
      this.loadingCourse = true;

      this.courseService.getCourseById(id).subscribe({
        next: (course) => {
          this.course = {
            nombre: course.nombre,
            categoria: course.categoria,
            docente: course.docente,
            modalidad: course.modalidad,
            duracionHoras: course.duracionHoras,
            vacantes: course.vacantes,
            costo: course.costo,
            fechaInicio: this.formatDateForInput(course.fechaInicio),
            activo: course.activo,
            descripcion: course.descripcion
          };
          this.loadingCourse = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Error al cargar el curso';
          this.loadingCourse = false;
          this.cdr.detectChanges();
          console.error(err);
        }
      });
    }
  }

  private formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    if (this.isEdit) {
      this.courseService.updateCourse(this.courseId, this.course).subscribe({
        next: () => {
          this.router.navigate(['/courses']);
        },
        error: (err) => {
          this.error = 'Error al actualizar el curso';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.courseService.addCourse(this.course).subscribe({
        next: () => {
          this.router.navigate(['/courses']);
        },
        error: (err) => {
          this.error = 'Error al crear el curso';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/courses']);
  }
}
