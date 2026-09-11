export type EstadoAsistencia = 'Presente' | 'Ausente' | 'Tardanza' | 'Permiso';

export type RolUsuario = 'Docente' | 'Coordinador' | 'Limpieza' | 'Seguridad' | 'Administracion';

export interface UsuarioSistema {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  usuario: string;
  clave: string;
  roles: RolUsuario[];
  fotoUrl?: string;
  resena?: string;
  qrCode?: string;
}

export interface RegistroAsistencia {
  id: string;
  idUsuario?: string;
  nombreDocente: string;
  rol: string;
  fecha: string;
  horaEntrada: string;
  horaSalida?: string;
  estado: EstadoAsistencia;
  observaciones?: string;
}