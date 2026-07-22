import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { StatusMessage } from '../components/StatusMessage.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { getCourses } from '../services/courseService.js';

export function CoursesPage() {
  const { data: courses, loading, error } = useAsync(getCourses, []);

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Oferta disponible</p>
        <h2>Cursos para este ciclo</h2>
      </div>
      {loading && <LoadingSpinner label="Cargando cursos..." />}
      <StatusMessage type="error">{error}</StatusMessage>
      <div className="course-grid">
        {courses?.length === 0 && <p>No hay cursos disponibles</p>}
        {courses?.map((course, index) => (
          <article className="course-card" key={course.id || index}>
            <div>
              <span className="badge">{course.category || 'Sin categoria'}</span>
              <h3>{course.title || 'Sin titulo'}</h3>
              <p>{course.summary || 'Sin descripcion'}</p>
            </div>
            <dl className="course-meta">
              <div>
                <dt>Duracion</dt>
                <dd>{course.duration || '-'}</dd>
              </div>
              <div>
                <dt>Cupos</dt>
                <dd>{course.seats || '-'}</dd>
              </div>
            </dl>
            <Link className="text-link" to={`/cursos/${course.id}`}>
              Ver detalle
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
