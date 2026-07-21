import { Injectable } from '@angular/core';
import { Course } from '../../shared/models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private courses: Course[] = [
    {
      id: '1',
      nombre: 'JavaScript Avanzado',
      categoria: 'Programación',
      docente: 'Carlos Mendoza',
      modalidad: 'virtual',
      duracionHoras: 40,
      vacantes: 20,
      costo: 150,
      fechaInicio: '2026-05-15',
      activo: true,
      descripcion: 'Curso intensivo de JavaScript moderno covering ES6+, async/await, closures y patrones de diseño.'
    },
    {
      id: '2',
      nombre: 'Python para Data Science',
      categoria: 'Data Science',
      docente: 'María López',
      modalidad: 'presencial',
      duracionHoras: 60,
      vacantes: 15,
      costo: 200,
      fechaInicio: '2026-06-01',
      activo: true,
      descripcion: 'Introducción al análisis de datos con Python, pandas, numpy y visualización con matplotlib.'
    },
    {
      id: '3',
      nombre: 'Desarrollo Web con Angular',
      categoria: 'Programación',
      docente: 'Juan Pérez',
      modalidad: 'hibrido',
      duracionHoras: 50,
      vacantes: 18,
      costo: 180,
      fechaInicio: '2026-05-20',
      activo: true,
      descripcion: 'Aprende a crear aplicaciones web modernas con Angular 21, TypeScript y RxJS.'
    },
    {
      id: '4',
      nombre: 'Fundamentos de Bases de Datos',
      categoria: 'Bases de Datos',
      docente: 'Roberto Torres',
      modalidad: 'virtual',
      duracionHoras: 35,
      vacantes: 25,
      costo: 120,
      fechaInicio: '2026-07-01',
      activo: true,
      descripcion: 'Conceptos fundamentales de bases de datos, modelado ER y SQL básico.'
    },
    {
      id: '5',
      nombre: 'Machine Learning con Python',
      categoria: 'Data Science',
      docente: 'Laura Martínez',
      modalidad: 'presencial',
      duracionHoras: 80,
      vacantes: 12,
      costo: 350,
      fechaInicio: '2026-06-15',
      activo: true,
      descripcion: 'Algoritmos de machine learning, scikit-learn, TensorFlow y proyectos prácticos.'
    },
    {
      id: '6',
      nombre: 'Docker y Kubernetes',
      categoria: 'DevOps',
      docente: 'Diego Ramírez',
      modalidad: 'virtual',
      duracionHoras: 30,
      vacantes: 20,
      costo: 200,
      fechaInicio: '2026-08-01',
      activo: false,
      descripcion: 'Contenedores, orquestación y despliegue de aplicaciones en la nube.'
    },
    {
      id: '7',
      nombre: 'Diseño UX/UI',
      categoria: 'Diseño',
      docente: 'Sofia Hernández',
      modalidad: 'hibrido',
      duracionHoras: 45,
      vacantes: 16,
      costo: 250,
      fechaInicio: '2026-05-25',
      activo: true,
      descripcion: 'Principios de diseño, wireframing, prototipado y herramientas como Figma.'
    },
    {
      id: '8',
      nombre: 'React y Next.js',
      categoria: 'Programación',
      docente: 'Andrés Ruiz',
      modalidad: 'virtual',
      duracionHoras: 55,
      vacantes: 22,
      costo: 190,
      fechaInicio: '2026-07-15',
      activo: true,
      descripcion: 'Desarrollo frontend con React, hooks, contexto y el framework Next.js.'
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
