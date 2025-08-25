export interface Usuario {
  nombres: string
  apellidos: string
  nombreUsuario: string
  correo: string
  celular: string
  clave: string
  genero: string
  estado: boolean
  tipoUsuarioId: number;
  rolId: number
}

export interface reestablecerClave {
  nombreUsuario: string;
  correo: string;
  clave: string;
  confirmarClave: string;
}