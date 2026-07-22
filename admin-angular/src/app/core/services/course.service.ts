import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError, timeout } from 'rxjs';
import { Course, CourseCreate } from '../../shared/models/course.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/courses`;

  getCourses(): Observable<Course[]> {
    console.log('CourseService.getCourses() - URL:', this.apiUrl);
    return this.http.get<Course[]>(this.apiUrl).pipe(
      timeout(10000),
      map(courses => {
        console.log('CourseService.getCourses() - Respuesta raw:', courses);
        if (!Array.isArray(courses)) {
          throw new Error('La respuesta no es un array de cursos');
        }
        return courses.map(course => ({
          ...course,
          id: course._id
        }));
      }),
      catchError(error => {
        console.error('CourseService.getCourses() - Error:', error);
        return throwError(() => error);
      })
    );
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      timeout(10000),
      map(course => ({
        ...course,
        id: course._id
      })),
      catchError(error => {
        console.error('CourseService.getCourseById() - Error:', error);
        return throwError(() => error);
      })
    );
  }

  addCourse(course: CourseCreate): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      map(created => ({
        ...created,
        id: created._id
      }))
    );
  }

  updateCourse(id: string, course: CourseCreate): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      map(updated => ({
        ...updated,
        id: updated._id
      }))
    );
  }

  deleteCourse(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
