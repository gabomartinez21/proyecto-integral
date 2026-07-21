# Caso de Negocio: Sistema de Gestión de Cursos de Extensión

## 1. Contexto y Problemática

La institución académica requiere modernizar su proceso de administración del catálogo de cursos de extensión. Actualmente, la gestión se realiza de manera manual mediante hojas de cálculo y documentos, lo que genera:

- Dificultades para mantener información actualizada y一致性
- Demora en la búsqueda de cursos por parte de los interesados
- Errores en el registro de datos de cursos
- отсутствие visibilidad en tiempo real del estado de cursos

## 2. Objetivo del Proyecto

Desarrollar una aplicación web basada en Angular que permita a los coordinadores académicos administrar eficientemente el catálogo de cursos de extensión, proporcionando una interfaz intuitiva para crear, editar, visualizar y gestionar cursos.

## 3. Alcance del Sistema

### 3.1 Funcionalidades Principales

| Funcionalidad | Descripción |
|---------------|-------------|
| Listado de cursos | Vista tabular con todos los cursos y su información resumida |
| Detalle de curso | Información completa y detallada de cada curso |
| Registro de cursos | Formulario para crear nuevos cursos con validación |
| Edición de cursos | Modificación de datos de cursos existentes |
| Estado del curso | Visualización y control de cursos activos/inactivos |

### 3.2 Usuario Principal

**Coordinador Académico**: Profesional responsable de administrar el catálogo de cursos, crear nuevos offerings, actualizar información y gestionar la disponibilidad de cursos.

### 3.3 Modelo de Datos - Curso

Cada curso de extensión cuenta con los siguientes atributos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | string | Identificador único generado automáticamente |
| nombre | string | Denominación del curso |
| categoría | string | Área temática del curso |
| docente | string | Instructor responsable |
| modalidad | enum | Presencial, Virtual o Híbrido |
| duraciónHoras | number | Total de horas lectivas |
| vacantes | number | Cantidad de plazas disponibles |
| costo | number | Precio en soles (S/) |
| fechaInicio | string | Fecha de inicio del curso |
| activo | boolean | Estado: true = activo, false = inactivo |
| descripción | string | Detalles adicionales del curso |

## 4. Requisitos Técnicos

### 4.1 stack Tecnológico

- **Framework**: Angular 21 (CLI)
- **Lenguaje**: TypeScript con tipado estático
- **Enrutamiento**: Angular Router con rutas parametrizadas
- **Formularios**: Angular Forms con validación
- **Consumo de datos**: Servicio REST simulado (local)

### 4.2 Arquitectura de Componentes

```
src/app/
├── core/services/          # Servicios de negocio
├── shared/
│   ├── models/            # Interfaces y modelos TypeScript
│   └── components/        # Componentes compartidos (header)
└── features/
    ├── home/              # Dashboard/página principal
    └── courses/
        ├── course-list/   # Listado con tabla
        ├── course-form/   # Crear/Editar
        └── course-detail/ # Vista detallada
```

### 4.3 Patrones de Diseño

- **Standalone Components**: Todos los componentes son independientes
- **Inject**: Uso de `inject()` para dependencias
- **Signal-based**: Modelo de reactividad moderno
- **TypeScript interfaces**: Tipado fuerte en todo el código

## 5. Beneficios Esperados

| Beneficio | Impacto |
|-----------|---------|
|Centralización | Información unificada y accesible |
| Eficiencia | Reducción de tiempo en administración |
| Consistencia | Datos uniformnes y validados |
| Rapidez | Consulta inmediata de cursos |
| Escalabilidad | Base para futuras funcionalidades |

## 6. Cronograma de Implementación

**Fase 1 - Caso de Negocio** (Este documento)
- Definición de contexto, alcance y requisitos

**Fase 2 - Desarrollo Core**
- Configuración del proyecto Angular
- Modelo de datos Course
- Servicio CourseService
- Componente Header
- Rutas principales

**Fase 3 - Funcionalidades**
- Listado de cursos (tabla con filtros visuales)
- Detalle de curso
- Formulario de creación/edición
- Validación de datos

**Fase 4 - Documentación y Entrega**
- README con instrucciones
- Capturas de pantalla
- Sustentación

## 7. Consideraciones de Diseño

### 7.1 Interfaz de Usuario

- Diseño limpio y profesional
- Tabla responsive para listado de cursos
- Formularios con validación en tiempo real
- Mensajes de error claros y feedback visual
- Estados visuales para activo/inactivo

### 7.2 Validaciones Implementadas

- Nombre: mínimo 3 caracteres, requerido
- Categoría: requerida
- Docente: requerido
- Modalidad: selección obligatoria
- Duración: mayor a 0
- Vacantes: mayor a 0
- Costo: valor positivo
- Fecha: requerida

## 8. Limitaciones y Supuestos

- Los datos se almacenan en memoria (no persistencia real)
- No hay autenticación de usuarios
- No hay paginación (lista completa)
- No hay filtros avanzados en listado
- API REST simulada con datos locales

---

**Versión**: 1.0
**Fecha**: Abril 2026
**Proyecto**: Programación Web II - PA1