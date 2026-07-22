const { body } = require('express-validator');

exports.registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('email')
    .trim()
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('role')
    .optional()
    .isIn(['admin', 'teacher', 'student']).withMessage('Rol inválido')
];

exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña es requerida')
];

exports.courseValidation = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
  body('categoria')
    .trim()
    .notEmpty().withMessage('La categoría es requerida'),
  body('docente')
    .trim()
    .notEmpty().withMessage('El docente es requerido'),
  body('modalidad')
    .notEmpty().withMessage('La modalidad es requerida')
    .isIn(['presencial', 'virtual', 'hibrido']).withMessage('Modalidad inválida'),
  body('duracionHoras')
    .notEmpty().withMessage('La duración es requerida')
    .isInt({ min: 1 }).withMessage('La duración debe ser al menos 1 hora'),
  body('vacantes')
    .notEmpty().withMessage('Las vacantes son requeridas')
    .isInt({ min: 1 }).withMessage('Debe haber al menos 1 vacante'),
  body('costo')
    .notEmpty().withMessage('El costo es requerido')
    .isFloat({ min: 0 }).withMessage('El costo no puede ser negativo'),
  body('fechaInicio')
    .notEmpty().withMessage('La fecha de inicio es requerida')
    .isISO8601().withMessage('Fecha inválida'),
  body('descripcion')
    .optional()
    .trim(),
  body('activo')
    .optional()
    .isBoolean().withMessage('El estado debe ser verdadero o falso')
];

exports.enrollmentValidation = [
  body('course')
    .notEmpty()
    .withMessage('El curso es requerido')
    .isMongoId()
    .withMessage('ID de curso inválido')
];
