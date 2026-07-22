import { Injectable } from '@angular/core';
import { Course } from '../../shared/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses: Course[] = [
    {
      id: '1',
      nombre: 'Desarrollo Web con Angular',
      categoria: 'Programación',
      docente: 'Carlos Ramírez',
      modalidad: 'virtual',
      duracionHoras: 40,
      vacantes: 30,
      costo: 250,
      fechaInicio: '2026-08-01',
      activo: true,
      descripcion: 'Curso de creación de aplicaciones web usando Angular.'
    },
    {
      id: '2',
      nombre: 'Base de Datos SQL',
      categoria: 'Tecnología',
      docente: 'Ana Torres',
      modalidad: 'presencial',
      duracionHoras: 50,
      vacantes: 25,
      costo: 300,
      fechaInicio: '2026-08-15',
      activo: true,
      descripcion: 'Aprende diseño y administración de bases de datos.'
    },
    {
      id: '3',
      nombre: 'Programación Java',
      categoria: 'Software',
      docente: 'Luis Mendoza',
      modalidad: 'hibrido',
      duracionHoras: 60,
      vacantes: 20,
      costo: 350,
      fechaInicio: '2026-09-01',
      activo: true,
      descripcion: 'Curso de programación orientada a objetos con Java.'
    }
  ];


  getCourses(): Course[] {
  return this.courses;
}

getCourseById(id: string): Course | undefined {
  return this.courses.find(course => course.id === id);
}


  addCourse(course: Course): void {
    this.courses.push(course);
  }


  updateCourse(id: string, course: Course): void {
    const index = this.courses.findIndex(c => c.id === id);

    if(index !== -1){
      this.courses[index] = course;
    }
  }


  deleteCourse(id: string): void {
    this.courses = this.courses.filter(c => c.id !== id);
  }

}