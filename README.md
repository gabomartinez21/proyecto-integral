# Proyecto Integrador

Participantes del grupo:

- Gabriel Alejandro Martinez Labrador - 03475797@mail.isil.pe
- Kenneth Lee Quinto Orrihuela - 72497660@mail.isil.pe

### Video Youtube

URL: https://youtu.be/Ye31BPhS_jk

### URL's publicas

admin-angular: https://admin-angular-omega.vercel.app/login
portal-react: https://portal-react-two.vercel.app/login
public-next: https://public-next-pi.vercel.app/

## Sistema de Gestión de Cursos

Sistema integral para la gestión de cursos que consta de un panel administrativo en Angular y una API REST con Node.js/Express conectada a MongoDB.

## Arquitectura del Proyecto

```
proyecto-integral/
├── admin-angular/          # Frontend - Panel Administrativo (Angular 19)
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/services/       # Servicios (CourseService, AuthService)
│   │   │   ├── features/courses/    # Componentes de cursos
│   │   │   └── shared/models/       # Interfaces TypeScript
│   │   └── environments/            # Configuración de entornos
│   └── package.json
│
├── api/                    # Backend - API REST (Node.js + Express)
│   ├── src/
│   │   ├── config/         # Conexión a MongoDB
│   │   ├── controllers/    # Lógica de negocio
│   │   ├── middlewares/    # Auth y validaciones
│   │   ├── models/         # Esquemas Mongoose
│   │   ├── routes/         # Definición de endpoints
│   │   └── utils/          # Validaciones con express-validator
│   └── package.json
│
└── README.md
```

## Flujo de Conexión

```
┌─────────────────┐     HTTP/JSON      ┌─────────────────┐     Mongoose     ┌─────────────────┐
│  Admin Angular  │ ←───────────────→  │   API Express   │ ←──────────────→ │    MongoDB      │
│  localhost:4200 │                    │  localhost:3000 │                  │                 │
└─────────────────┘                    └─────────────────┘                  └─────────────────┘
        │                                      │
        │ CourseService                        │ course.controller.js
        │ HttpClient                           │ course.model.js
        └──────────────────────────────────────┘
```

## Tecnologías

### Frontend (admin-angular)

- Angular 19
- TypeScript
- HttpClient para peticiones HTTP
- Template-driven forms

### Backend (api)

- Node.js
- Express.js
- Mongoose (ODM para MongoDB)
- JWT para autenticación
- express-validator para validaciones
- bcrypt para hash de contraseñas

### Base de Datos

- MongoDB

## Endpoints de la API

### Autenticación

| Método | Endpoint             | Descripción       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Registrar usuario |
| POST   | `/api/auth/login`    | Iniciar sesión    |

### Cursos (requieren autenticación)

| Método | Endpoint           | Descripción             | Rol requerido       |
| ------ | ------------------ | ----------------------- | ------------------- |
| GET    | `/api/courses`     | Listar todos los cursos | Usuario autenticado |
| GET    | `/api/courses/:id` | Obtener curso por ID    | Usuario autenticado |
| POST   | `/api/courses`     | Crear nuevo curso       | Admin               |
| PUT    | `/api/courses/:id` | Actualizar curso        | Admin               |
| DELETE | `/api/courses/:id` | Eliminar curso          | Admin               |

### Usuarios

| Método | Endpoint         | Descripción            |
| ------ | ---------------- | ---------------------- |
| GET    | `/api/users`     | Listar usuarios        |
| GET    | `/api/users/:id` | Obtener usuario por ID |

## Modelo de Datos

### Course (Curso)

```javascript
{
  nombre: String,          // Nombre del curso (requerido, min 3 caracteres)
  descripcion: String,     // Descripción del curso
  categoria: String,       // Categoría (requerido)
  docente: String,         // Nombre del docente (requerido)
  modalidad: String,       // 'presencial' | 'virtual' | 'hibrido'
  duracionHoras: Number,   // Duración en horas (min 1)
  vacantes: Number,        // Número de vacantes (min 1)
  costo: Number,           // Costo del curso (min 0)
  fechaInicio: Date,       // Fecha de inicio (requerido)
  activo: Boolean,         // Estado del curso (default: true)
  createdAt: Date          // Fecha de creación
}
```

### User (Usuario)

```javascript
{
  name: String,            // Nombre del usuario
  email: String,           // Email único
  password: String,        // Contraseña hasheada
  role: String             // 'admin' | 'teacher' | 'student'
}
```

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd proyecto-integral
```

### 2. Configurar la API (Backend)

```bash
cd api
npm install
```

Crear archivo `.env` en la carpeta `api/`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/cursos_db
JWT_SECRET=tu_clave_secreta_aqui
```

Ejecutar la API:

```bash
npm run dev
```

La API estará disponible en `http://localhost:3000`

### 3. Configurar Admin Angular (Frontend)

```bash
cd admin-angular
npm install
```

La configuración de la API ya está en `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000/api",
};
```

Ejecutar Angular:

```bash
npm start
```

El panel administrativo estará disponible en `http://localhost:4200`

### 4. Configurar MongoDB

Asegurarse de tener MongoDB corriendo localmente o usar MongoDB Atlas.

## Funcionalidades del Panel Administrativo

- Listado de cursos con tabla responsive
- Crear nuevo curso con formulario validado
- Editar curso existente
- Ver detalle de curso
- Eliminar curso con confirmación
- Estados de carga y manejo de errores
- Interceptor de autenticación (JWT)

## Servicios de Angular

### CourseService

Ubicación: `admin-angular/src/app/core/services/course.service.ts`

```typescript
// Métodos disponibles
getCourses(): Observable<Course[]>
getCourseById(id: string): Observable<Course>
addCourse(course: CourseCreate): Observable<Course>
updateCourse(id: string, course: CourseCreate): Observable<Course>
deleteCourse(id: string): Observable<{ message: string }>
```

### AuthService

Ubicación: `admin-angular/src/app/core/services/auth.service.ts`

Maneja la autenticación y almacenamiento del token JWT.

### AuthInterceptor

Ubicación: `admin-angular/src/app/core/services/interceptors/auth.interceptor.ts`

Agrega automáticamente el token JWT a todas las peticiones HTTP.

## Scripts Disponibles

### API

```bash
npm run dev      # Modo desarrollo con nodemon
npm start        # Modo producción
```

### Admin Angular

```bash
npm start        # Servidor de desarrollo
npm run build    # Build de producción
npm test         # Ejecutar tests
```

## Autores

- Proyecto Integrador - Programación Avanzada
- ISIL - 7mo Ciclo
