const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del curso es requerido'],
    trim: true,
    minlength: [3, 'El nombre debe tener al menos 3 caracteres']
  },
  descripcion: {
    type: String,
    trim: true,
    default: ''
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es requerida'],
    trim: true
  },
  docente: {
    type: String,
    required: [true, 'El docente es requerido'],
    trim: true
  },
  modalidad: {
    type: String,
    enum: ['presencial', 'virtual', 'hibrido'],
    required: [true, 'La modalidad es requerida']
  },
  duracionHoras: {
    type: Number,
    required: [true, 'La duración es requerida'],
    min: [1, 'La duración debe ser al menos 1 hora']
  },
  vacantes: {
    type: Number,
    required: [true, 'Las vacantes son requeridas'],
    min: [1, 'Debe haber al menos 1 vacante']
  },
  costo: {
    type: Number,
    required: [true, 'El costo es requerido'],
    min: [0, 'El costo no puede ser negativo']
  },
  fechaInicio: {
    type: Date,
    required: [true, 'La fecha de inicio es requerida']
  },
  activo: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);