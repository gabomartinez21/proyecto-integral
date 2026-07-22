import { fallbackCourses } from '../data/fallbackCourses.js';

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

// Mapea los campos de la API a los campos esperados por el frontend
function mapCourse(course) {
  return {
    id: course._id,
    title: course.nombre,
    category: course.categoria,
    duration: `${course.duracionHoras} horas`,
    seats: course.vacantes,
    summary: course.descripcion?.substring(0, 100) || '',
    description: course.descripcion,
    teacher: course.docente,
    modality: course.modalidad,
    schedule: `${course.modalidad} - ${course.duracionHoras}h`,
    cost: course.costo,
    startDate: course.fechaInicio,
    active: course.activo
  };
}

export async function getPublicCourses() {
  try {
    const response = await fetch(`${apiUrl}/courses`, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('API no disponible');
    }

    const data = await response.json();
    // La API devuelve array directo
    const courses = Array.isArray(data) ? data : [];
    return courses.filter(c => c.activo !== false).map(mapCourse);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return fallbackCourses;
  }
}

export async function getPublicCourse(id) {
  try {
    const response = await fetch(`${apiUrl}/courses/${id}`, {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      return null;
    }

    const course = await response.json();
    return mapCourse(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    // Buscar en fallback
    return fallbackCourses.find((course) => course.id === id) ?? null;
  }
}
