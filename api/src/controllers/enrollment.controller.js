const Enrollment = require('../models/enrollment.model');
const Course = require('../models/course.model');

exports.create = async (req, res) => {
  try {
    const studentId = req.user.id; // obtenido del JWT
    const { course } = req.body;

    const courseFound = await Course.findById(course);
    if (!courseFound) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    if (courseFound.enrolledStudents >= courseFound.maxStudents) {
      return res.status(400).json({
        success: false,
        message: 'No hay cupos disponibles'
      });
    }

    const existing = await Enrollment.findOne({
      student: studentId,
      course
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Ya estás inscrito en este curso'
      });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course
    });

    courseFound.enrolledStudents += 1;
    await courseFound.save();

    res.status(201).json({
      success: true,
      message: 'Inscripción realizada correctamente',
      data: enrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('student', 'name email')
      .populate('course', 'title');

    res.json({
      success: true,
      data: enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user.id
    }).populate('course');

    res.json({
      success: true,
      data: enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate('student', 'name email')
      .populate('course', 'title');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Inscripción no encontrada'
      });
    }

    res.json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Inscripción no encontrada'
      });
    }

    const course = await Course.findById(enrollment.course);
    if (course && course.enrolledStudents > 0) {
      course.enrolledStudents -= 1;
      await course.save();
    }

    await enrollment.deleteOne();

    res.json({
      success: true,
      message: 'Inscripción eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};