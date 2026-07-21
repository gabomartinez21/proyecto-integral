# Gestión de Cursos - Angular

Sistema de administración de cursos de extensión académica desarrollado con Angular 21.

## Requisitos

- Node.js 18+ y npm
- Angular CLI 21

## Instalación

```bash
cd gestion-cursos
npm install
```

## Ejecución

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

## Estructura del Proyecto

```
src/app/
├── core/services/
│   └── course.service.ts       # Servicio de gestión de cursos
├── shared/
│   ├── models/
│   │   └── course.model.ts    # Interfaz TypeScript para Curso
│   └── components/
│       └── header/            # Componente de encabezado
├── features/
│   ├── home/                  # Página de inicio/dashboard
│   └── courses/
│       ├── course-list/       # Listado de cursos
│       ├── course-form/       # Formulario crear/editar
│       └── course-detail/     # Detalle de curso
├── app.routes.ts              # Configuración de rutas
└── app.ts                     # Componente principal
```

## Funcionalidades

- **Listar cursos**: Ver todos los cursos con información detallada
- **Ver detalle**: Consultar información completa de cada curso
- **Crear curso**: Registrar nuevos cursos con validación
- **Editar curso**: Modificar datos de cursos existentes
- **Estado activo/inactivo**: Visualizar y gestionar estado del curso

## Modelo de Datos - Curso

| Campo           | Tipo          | Descripción                |
|-----------------|---------------|----------------------------|
| id              | string        | Identificador único        |
| nombre          | string        | Nombre del curso           |
| categoria       | string        | Categoría del curso        |
| docente         | string        | Nombre del docente         |
| modalidad       | string        | presencial/virtual/hibrido |
| duracionHoras   | number        | Duración en horas          |
| vacantes        | number        | Número de vacantes         |
| costo           | number        | Costo en soles             |
| fechaInicio     | string        | Fecha de inicio (YYYY-MM-DD)|
| activo          | boolean       | Estado del curso           |
| descripcion     | string        | Descripción del curso      |

## Rutas

| Ruta                | Componente        | Descripción           |
|---------------------|-------------------|-----------------------|
| `/`                 | HomeComponent     | Página de inicio      |
| `/courses`          | CourseListComponent | Listado de cursos   |
| `/courses/new`      | CourseFormComponent | Crear nuevo curso    |
| `/courses/edit/:id` | CourseFormComponent | Editar curso         |
| `/courses/:id`      | CourseDetailComponent | Ver detalle       |

## Tecnologias

- Angular 21
- TypeScript
- RxJS
- CSS (sin framework de estilos)