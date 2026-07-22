import { api } from './api.js';

// Mapea los campos de la API a los campos esperados por el frontend
function mapCourse(course) {
  if (!course) return null;

  // Manejar diferentes formatos de ID
  const id = course._id?.toString() || course.id?.toString() || null;

  return {
    id,
    title: course.nombre || course.title || '',
    category: course.categoria || course.category || '',
    duration: course.duracionHoras ? `${course.duracionHoras} horas` : (course.duration || ''),
    seats: course.vacantes ?? course.seats ?? 0,
    summary: (course.descripcion || course.description || '').substring(0, 100),
    description: course.descripcion || course.description || '',
    teacher: course.docente || course.teacher || '',
    modality: course.modalidad || course.modality || '',
    schedule: course.modalidad ? `${course.modalidad} - ${course.duracionHoras}h` : (course.schedule || ''),
    cost: course.costo ?? course.cost ?? 0,
    startDate: course.fechaInicio || course.startDate || '',
    active: course.activo ?? course.active ?? true
  };
}

// Mapea enrollment de la API al formato esperado
function mapEnrollment(enrollment) {
  return {
    id: enrollment._id,
    status: enrollment.status,
    createdAt: enrollment.enrolledAt,
    course: mapCourse(enrollment.course)
  };
}

export async function getCourses() {
  const { data } = await api.get('/courses');
  console.log('getCourses - Raw data:', data);
  // La API devuelve array directo
  const courses = Array.isArray(data) ? data : (data.data || []);
  const mapped = courses.map(mapCourse);
  console.log('getCourses - Mapped:', mapped);
  return mapped;
}

export async function getCourse(id) {
  const { data } = await api.get(`/courses/${id}`);
  // La API devuelve objeto directo
  const course = data.data || data;
  return mapCourse(course);
}

export async function enrollInCourse(courseId) {
  // La API espera { course: id }
  const { data } = await api.post('/enrollments', { course: courseId });
  return data;
}

export async function getMyEnrollments() {
  const { data } = await api.get('/my-enrollments');
  // La API devuelve { success: true, data: [...] }
  const enrollments = data.data || data || [];
  return Array.isArray(enrollments) ? enrollments.map(mapEnrollment) : [];
}
