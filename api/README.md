# Gestión de Cursos e Inscripciones

## Descripción
API REST para gestionar cursos e inscripciones con autenticación JWT.

## Requisitos
- Node.js v18+
- MongoDB v6+

## Instalación

```bash
npm install
```

## Variables de entorno
Crear archivo `.env` con:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/gestion_cursos
JWT_SECRET=tu_secreto_jwt_aqui
JWT_EXPIRES_IN=24h
```

## Ejecución

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Cursos (requiere autenticación)
- `GET /api/courses` - Listar cursos
- `POST /api/courses` - Crear curso
- `GET /api/courses/:id` - Ver curso
- `PUT /api/courses/:id` - Editar curso
- `DELETE /api/courses/:id` - Eliminar curso

### Inscripciones (requiere autenticación)
- `POST /api/enrollments` - Crear inscripción
- `GET /api/enrollments` - Listar inscripciones
- `GET /api/enrollments/:id` - Ver inscripción

### Usuarios
- `GET /api/users` - Listar usuarios (admin)
- `GET /api/users/:id` - Ver usuario