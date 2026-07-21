const Course = require('../models/course.model');

exports.getAll = async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher', 'name email').select('-__v');
    res.json({
      count: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cursos', error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('teacher', 'name email')
      .select('-__v');
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener curso', error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, description, teacher, maxStudents } = req.body;

    const course = await Course.create({ title, description, teacher, maxStudents });
    const populatedCourse = await Course.findById(course._id).populate('teacher', 'name email');

    res.status(201).json({
      message: 'Curso creado exitosamente',
      course: populatedCourse
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear curso', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, description, maxStudents } = req.body;

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, maxStudents },
      { new: true, runValidators: true }
    ).populate('teacher', 'name email');

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    res.json({
      message: 'Curso actualizado exitosamente',
      course
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar curso', error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.json({ message: 'Curso eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar curso', error: error.message });
  }
};