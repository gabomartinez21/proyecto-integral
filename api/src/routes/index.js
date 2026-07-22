const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const courseController = require('../controllers/course.controller');
const enrollmentController = require('../controllers/enrollment.controller');
const auth = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const validate = require('../utils/validate');
const {
  registerValidation,
  loginValidation,
  courseValidation,
  enrollmentValidation
} = require('../utils/validations');

module.exports = (app) => {
  // Auth routes
  app.post('/api/auth/register', registerValidation, validate, authController.register);
  app.post('/api/auth/login', loginValidation, validate, authController.login);

  // User routes
  app.get('/api/users', auth, userController.getAll);
  app.get('/api/users/:id', auth, userController.getById);

  // Course routes (GET es publico para que Next.js pueda mostrar catalogo)
  app.get('/api/courses', courseController.getAll);
  app.get('/api/courses/:id', courseController.getById);
  app.post('/api/courses', auth, roleMiddleware('admin'), courseValidation, validate, courseController.create);
  app.put('/api/courses/:id', auth, roleMiddleware('admin'), courseValidation, validate, courseController.update);
  app.delete('/api/courses/:id', auth, roleMiddleware('admin'), courseController.delete);

   // Enrollment routes
   app.post('/api/enrollments', auth, roleMiddleware('student'), enrollmentValidation, validate, enrollmentController.create);
   app.get('/api/enrollments', auth, roleMiddleware('admin'), enrollmentController.getAll);
   app.get('/api/enrollments/:id', auth, enrollmentController.getById);
   app.get('/api/my-enrollments', auth, roleMiddleware('student'), enrollmentController.getMyEnrollments);
   app.delete('/api/enrollments/:id', auth, enrollmentController.delete);
};