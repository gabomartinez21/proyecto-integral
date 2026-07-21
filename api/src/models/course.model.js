const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título del curso es requerido'],
    trim: true,
    minlength: [3, 'El título debe tener al menos 3 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El docente es requerido']
  },
  maxStudents: {
    type: Number,
    default: 30,
    min: [1, 'Debe haber al menos 1 estudiante']
  },
  enrolledStudents: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);