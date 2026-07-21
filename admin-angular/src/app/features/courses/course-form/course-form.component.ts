import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../core/services/course.service';
import { Course, Modalidad } from '../../../shared/models/course.model';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './course-form.component.html',
  styleUrl:'./course-form.css'
})
export class CourseFormComponent {
  private courseService = inject(CourseService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEdit = false;
  course: Course = this.emptyCourse();

  private emptyCourse(): Course {
    return {
      id: '',
      nombre: '',
      categoria: '',
      docente: '',
      modalidad: 'presencial' as Modalidad,
      duracionHoras: 0,
      vacantes: 0,
      costo: 0,
      fechaInicio: '',
      activo: true,
      descripcion: ''
    };
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      const existing = this.courseService.getCourseById(id);
      if (existing) {
        this.course = { ...existing };
      } else {
        this.router.navigate(['/courses']);
      }
    }
  }

  onSubmit() {
    if (this.isEdit) {
      this.courseService.updateCourse(this.course.id, this.course);
    } else {
      this.course.id = Date.now().toString();
      this.courseService.addCourse(this.course);
    }
    this.router.navigate(['/courses']);
  }
}
