# Documentación Técnica - Sistema de Gestión de Cursos

## Índice

1. [Descripción General](#descripción-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [API Backend](#api-backend)
4. [Admin Angular](#admin-angular)
5. [Portal React](#portal-react)
6. [Public Next.js](#public-nextjs)
7. [Modelos de Datos](#modelos-de-datos)
8. [Autenticación y Autorización](#autenticación-y-autorización)
9. [Despliegue](#despliegue)

---

## Descripción General

Sistema integral de gestión de cursos compuesto por cuatro aplicaciones:

| Aplicación | Tecnología | Puerto | Propósito |
|------------|------------|--------|-----------|
| **API** | Node.js + Express | 3000 | Backend REST API |
| **Admin Angular** | Angular 19 | 4200 | Panel administrativo |
| **Portal React** | React 18 + Vite | 5173 | Portal de estudiantes |
| **Public Next.js** | Next.js 15 | 3001 | Sitio público (SSR) |

---

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
├─────────────────┬──────────────────┬────────────────────────┤
│  Admin Angular  │  Portal React    │   Public Next.js       │
│  (Panel Admin)  │  (Portal Est.)   │   (Sitio Público)      │
│  :4200          │  :5173           │   :3001                │
└────────┬────────┴────────┬─────────┴────────────┬───────────┘
         │                 │                      │
         │ HTTP/REST       │ HTTP/REST            │ HTTP/REST
         │ JWT Token       │ JWT Token            │ PÚBLICO
         │                 │                      │
         ▼                 ▼                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  API EXPRESS (Backend)                       │
│                     :3000/api                                │
├──────────────────────────────────────────────────────────────┤
│  Endpoints:                                                  │
│  • /auth     → Registro y Login                              │
│  • /courses  → CRUD de cursos                                │
│  • /enrollments → Inscripciones                              │
│  • /users    → Gestión de usuarios                           │
└────────┬────────────────────────────────────────────────────┘
         │
         │ Mongoose ODM
         ▼
┌─────────────────────────────────────────────────────────────┐
│               MongoDB Atlas (Base de Datos)                  │
│  Collections: users, courses, enrollments                    │
└─────────────────────────────────────────────────────────────┘
```

---

## API Backend

### Tecnologías

- **Runtime:** Node.js
- **Framework:** Express 4.18.2
- **Base de datos:** MongoDB (Mongoose 8.0.3)
- **Autenticación:** JWT (jsonwebtoken 9.0.2)
- **Encriptación:** bcryptjs 2.4.3
- **Validación:** express-validator 7.0.1
- **Seguridad:** helmet 7.2.0, cors 2.8.5

### Estructura de Carpetas

```
api/src/
├── app.js                  # Punto de entrada
├── config/
│   └── db.js              # Conexión MongoDB
├── controllers/
│   ├── auth.controller.js
│   ├── course.controller.js
│   ├── user.controller.js
│   └── enrollment.controller.js
├── middlewares/
│   ├── auth.middleware.js  # Validación JWT
│   └── role.middleware.js  # Validación de roles
├── models/
│   ├── user.model.js
│   ├── course.model.js
│   └── enrollment.model.js
├── routes/
│   └── index.js
└── utils/
    ├── validate.js
    └── validations.js
```

### Endpoints

#### Autenticación (Públicos)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |

#### Cursos

| Método | Endpoint | Auth | Rol | Descripción |
|--------|----------|------|-----|-------------|
| GET | `/api/courses` | No | - | Listar cursos |
| GET | `/api/courses/:id` | No | - | Obtener curso |
| POST | `/api/courses` | Sí | admin | Crear curso |
| PUT | `/api/courses/:id` | Sí | admin | Actualizar curso |
| DELETE | `/api/courses/:id` | Sí | admin | Eliminar curso |

#### Inscripciones

| Método | Endpoint | Auth | Rol | Descripción |
|--------|----------|------|-----|-------------|
| POST | `/api/enrollments` | Sí | student | Inscribirse |
| GET | `/api/enrollments` | Sí | admin | Listar todas |
| GET | `/api/my-enrollments` | Sí | - | Mis inscripciones |
| GET | `/api/enrollments/:id` | Sí | - | Obtener inscripción |
| DELETE | `/api/enrollments/:id` | Sí | - | Cancelar inscripción |

#### Usuarios

| Método | Endpoint | Auth | Rol | Descripción |
|--------|----------|------|-----|-------------|
| GET | `/api/users` | Sí | admin | Listar usuarios |
| GET | `/api/users/:id` | Sí | - | Obtener usuario |

### Variables de Entorno

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/gestion-cursos
JWT_SECRET=tu_secreto_minimo_32_caracteres
JWT_EXPIRES_IN=24h
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:4200,http://localhost:5173,http://localhost:3001
```

---

## Admin Angular

### Tecnologías

- **Framework:** Angular 19.2.0
- **TypeScript:** 5.9.2
- **RxJS:** 7.8.0
- **Package Manager:** Bun 1.2.2

### Estructura de Carpetas

```
admin-angular/src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   └── services/
│   │       ├── auth.service.ts
│   │       ├── course.service.ts
│   │       └── interceptors/
│   │           └── auth.interceptor.ts
│   ├── features/
│   │   ├── auth/login/
│   │   ├── courses/
│   │   │   ├── course-detail/
│   │   │   ├── course-form/
│   │   │   └── course-list/
│   │   └── home/
│   └── shared/
│       ├── components/header/
│       └── models/course.model.ts
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── main.ts
```

### Rutas

| Ruta | Componente | Protegida |
|------|------------|-----------|
| `/login` | LoginComponent | No |
| `/` | HomeComponent | Sí |
| `/courses` | CourseListComponent | Sí |
| `/courses/new` | CourseFormComponent | Sí |
| `/courses/edit/:id` | CourseFormComponent | Sí |
| `/courses/:id` | CourseDetailComponent | Sí |

### Servicios Principales

**AuthService** (`auth.service.ts`)
- `login(email, password)` - Autenticación
- `logout()` - Cerrar sesión
- `isAuthenticated()` - Verificar token

**CourseService** (`course.service.ts`)
- `getCourses()` - Listar cursos
- `getCourseById(id)` - Obtener curso
- `addCourse(course)` - Crear curso
- `updateCourse(id, course)` - Actualizar
- `deleteCourse(id)` - Eliminar

### Variables de Entorno

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

---

## Portal React

### Tecnologías

- **React:** 18.3.1
- **Router:** react-router-dom 6.28.1
- **HTTP Client:** axios 1.7.9
- **Build Tool:** Vite 6.0.7

### Estructura de Carpetas

```
portal-react/src/
├── App.jsx
├── main.jsx
├── components/
│   ├── AppLayout.jsx
│   ├── PublicLayout.jsx
│   ├── PrivateRoute.jsx
│   ├── LoadingSpinner.jsx
│   └── StatusMessage.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── LoginPage.jsx
│   ├── CoursesPage.jsx
│   ├── CourseDetailPage.jsx
│   └── MyCoursesPage.jsx
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── courseService.js
│   └── storage.js
├── hooks/
│   └── useAsync.js
└── utils/
    └── formatDate.js
```

### Rutas

| Ruta | Página | Protegida |
|------|--------|-----------|
| `/login` | LoginPage | No |
| `/cursos` | CoursesPage | No |
| `/cursos/:id` | CourseDetailPage | No |
| `/mis-cursos` | MyCoursesPage | Sí |

### Context de Autenticación

```jsx
// AuthContext.jsx
const AuthContext = {
  token: string | null,
  user: object | null,
  isAuthenticated: boolean,
  login: (credentials) => Promise,
  logout: () => void
}
```

### Mapeo de Campos API → UI

| API | UI |
|-----|-----|
| `_id` | `id` |
| `nombre` | `title` |
| `categoria` | `category` |
| `duracionHoras` | `duration` |
| `vacantes` | `seats` |
| `descripcion` | `description` |
| `docente` | `teacher` |
| `modalidad` | `modality` |
| `costo` | `cost` |
| `fechaInicio` | `startDate` |

### Variables de Entorno

```env
VITE_API_URL=http://localhost:3000/api
```

---

## Public Next.js

### Tecnologías

- **Next.js:** 15.5.19
- **React:** 18.3.1
- **Renderizado:** SSR dinámico

### Estructura de Carpetas

```
public-next/src/
├── app/
│   ├── page.jsx           # Home
│   ├── layout.jsx         # Layout raíz
│   ├── globals.css
│   └── cursos/
│       ├── page.jsx       # Catálogo
│       └── [id]/
│           └── page.jsx   # Detalle
├── components/
│   └── CourseStrip.jsx
├── services/
│   └── courses.js
└── data/
    └── fallbackCourses.js
```

### Rutas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Home | Hero + 3 cursos destacados |
| `/cursos` | Catálogo | Lista completa de cursos |
| `/cursos/[id]` | Detalle | Información del curso |

### Servicios

**courses.js**
- `getPublicCourses()` - Obtiene cursos (SSR)
- `getPublicCourse(id)` - Obtiene un curso (SSR)
- Timeout: 8 segundos
- Fallback a datos estáticos si falla

### Configuración SSR

```jsx
// Todas las páginas usan:
export const dynamic = 'force-dynamic';
```

### Variables de Entorno

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## Modelos de Datos

### User (Usuario)

```javascript
{
  name: String,        // Requerido, min 2 caracteres
  email: String,       // Requerido, único, formato email
  password: String,    // Requerido, min 6 caracteres, hasheado
  role: String,        // 'admin' | 'teacher' | 'student' (default)
  createdAt: Date      // Automático
}
```

### Course (Curso)

```javascript
{
  nombre: String,        // Requerido, min 3 caracteres
  descripcion: String,   // Opcional
  categoria: String,     // Requerido
  docente: String,       // Requerido
  modalidad: String,     // 'presencial' | 'virtual' | 'hibrido'
  duracionHoras: Number, // Requerido, min 1
  vacantes: Number,      // Requerido, min 1
  costo: Number,         // Requerido, min 0
  fechaInicio: Date,     // Requerido
  activo: Boolean,       // Default: true
  createdAt: Date        // Automático
}
```

### Enrollment (Inscripción)

```javascript
{
  student: ObjectId,    // Referencia a User
  course: ObjectId,     // Referencia a Course
  status: String,       // 'active' | 'completed' | 'cancelled'
  enrolledAt: Date      // Automático
  // Índice único: { student, course }
}
```

---

## Autenticación y Autorización

### Flujo de Autenticación

```
1. Usuario → POST /api/auth/login (email, password)
2. Backend → Valida credenciales con bcrypt
3. Backend → Genera JWT con payload { id, role }
4. Frontend → Almacena token en localStorage/sessionStorage
5. Frontend → Interceptor agrega header: Authorization: Bearer {token}
6. Backend → auth.middleware valida JWT en cada petición
```

### Roles y Permisos

| Rol | Cursos | Inscripciones | Usuarios |
|-----|--------|---------------|----------|
| **admin** | CRUD completo | Ver todas | Ver todos |
| **teacher** | Solo lectura | - | - |
| **student** | Solo lectura | Crear propias, ver propias | - |

### Middleware de Autenticación

```javascript
// auth.middleware.js
// 1. Extrae token del header Authorization
// 2. Verifica firma con JWT_SECRET
// 3. Adjunta usuario a req.user
// 4. Retorna 401 si token inválido/expirado
```

### Middleware de Roles

```javascript
// role.middleware.js
// 1. Verifica req.user.role
// 2. Compara con roles permitidos
// 3. Retorna 403 si no tiene permiso
```

---

## Despliegue

### Producción Actual

| Aplicación | Plataforma | URL |
|------------|------------|-----|
| API | Render | `https://proyecto-integral.onrender.com/api` |
| Admin Angular | Vercel | - |
| Portal React | Vercel | - |
| Public Next.js | Vercel | - |

### Scripts de Desarrollo

```bash
# API
cd api && npm run dev

# Admin Angular
cd admin-angular && ng serve

# Portal React
cd portal-react && npm run dev

# Public Next.js
cd public-next && npm run dev
```

### Scripts de Build

```bash
# API
cd api && npm start

# Admin Angular
cd admin-angular && ng build --configuration=production

# Portal React
cd portal-react && npm run build

# Public Next.js
cd public-next && npm run build && npm start
```

---

## Comandos Útiles

```bash
# Instalar dependencias (todos los proyectos)
npm install  # o bun install para admin-angular

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar tests (si existen)
npm test
```

---

*Documentación generada el 21 de julio de 2026*
