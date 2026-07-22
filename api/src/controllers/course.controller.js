const Course = require('../models/course.model');

exports.getAll = async (req, res) => {
  try {
    const courses = await Course.find().select('-__v');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cursos', error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).select('-__v');
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
    const {
      nombre,
      descripcion,
      categoria,
      docente,
      modalidad,
      duracionHoras,
      vacantes,
      costo,
      fechaInicio,
      activo
    } = req.body;

    const course = await Course.create({
      nombre,
      descripcion,
      categoria,
      docente,
      modalidad,
      duracionHoras,
      vacantes,
      costo,
      fechaInicio,
      activo
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear curso', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      categoria,
      docente,
      modalidad,
      duracionHoras,
      vacantes,
      costo,
      fechaInicio,
      activo
    } = req.body;

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        descripcion,
        categoria,
        docente,
        modalidad,
        duracionHoras,
        vacantes,
        costo,
        fechaInicio,
        activo
      },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    res.json(course);
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