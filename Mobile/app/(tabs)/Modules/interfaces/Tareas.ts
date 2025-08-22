export interface Tarea {
  titulo: string;
  descripcion: string;
  fechaLimite?: Date;
  prioridad: string;
  dificultad: string;
  estado: boolean;
  usuarioId: number;
}