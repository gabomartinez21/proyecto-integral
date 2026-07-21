export type Modalidad = 'presencial' | 'virtual' | 'hibrido';

export interface Course {
  id: string;
  nombre: string;
  categoria: string;
  docente: string;
  modalidad: Modalidad;
  duracionHoras: number;
  vacantes: number;
  costo: number;
  fechaInicio: string;
  activo: boolean;
  descripcion: string;
}