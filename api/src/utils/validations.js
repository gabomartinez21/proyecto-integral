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
  body('title')
    .trim()
    .notEmpty().withMessage('El título es requerido')
    .isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres'),
  body('description')
    .trim()
    .notEmpty().withMessage('La descripción es requerida'),
  body('teacher')
    .notEmpty().withMessage('El docente es requerido')
    .isMongoId().withMessage('ID de docente inválido'),
  body('maxStudents')
    .optional()
    .isInt({ min: 1 }).withMessage('Máximo de estudiantes debe ser un número positivo')
];

exports.enrollmentValidation = [
  body('course')
    .notEmpty()
    .withMessage('El curso es requerido')
    .isMongoId()
    .withMessage('ID de curso inválido'),

  body('student')
    .notEmpty()
    .withMessage('El estudiante es requerido')
    .isMongoId()
    .withMessage('ID del estudiante es inválido'),
];
