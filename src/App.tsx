import { useState } from 'react';
import type { RegistroAsistencia, UsuarioSistema } from './types/asistencia';
import { Login } from './components/auth/Login';
import { AsistenciaForm } from './components/asistencia/AsistenciaForm';
import { AsistenciaTable } from './components/asistencia/AsistenciaTable';
import { UsuarioForm } from './components/usuarios/UsuarioForm';

export default function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState<string | null>(null);
  const [vistaActual, setVistaActual] = useState<'asistencia' | 'usuarios' | 'horarios' | 'parqueo'>('asistencia');

  // Estado con un usuario por defecto de prueba
  const [usuarios, setUsuarios] = useState<UsuarioSistema[]>([
    {
      id: '1',
      nombre: 'Jeff',
      apellidos: 'Barillas',
      email: 'jeff.barillas@valledelsaber.edu.gt',
      telefono: '5555-5555',
      usuario: 'jeff',
      clave: '1234',
      roles: ['Docente', 'Administracion'],
      qrCode: 'VDS-USER-jeff-001'
    }
  ]);

  const [registros, setRegistros] = useState<RegistroAsistencia[]>([
    {
      id: '1',
      idUsuario: '1',
      nombreDocente: 'Jeff Barillas',
      rol: 'Docente',
      fecha: '2026-09-07',
      horaEntrada: '06:45 AM',
      horaSalida: '03:30 PM',
      estado: 'Presente',
      observaciones: 'Ingreso puntual dentro del establecimiento'
    }
  ]);

  const handleAgregarUsuario = (nuevoUsuario: UsuarioSistema) => {
    setUsuarios(prev => [nuevoUsuario, ...prev]);
  };

  const handleAgregarRegistro = (nuevoRegistro: RegistroAsistencia) => {
    setRegistros(prev => [nuevoRegistro, ...prev]);
  };

  const handleActualizarSalida = (idRegistro: string, horaSalida: string) => {
    setRegistros(prev => prev.map(reg => {
      if (reg.id === idRegistro) {
        return { ...reg, horaSalida };
      }
      return reg;
    }));
  };

  if (!usuarioAutenticado) {
    return <Login onLoginExitoso={setUsuarioAutenticado} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#fff', fontFamily: 'sans-serif' }}>
      {/* Header institucional */}
      <header style={{ background: '#1e293b', borderBottom: '1px solid #334155', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h2 style={{ margin: 0, color: '#38bdf8', fontSize: '18px' }}>Colegio Valle del Saber</h2>
          <span style={{ background: '#eab308', color: '#000', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>VDS Admin</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '14px', color: '#94a3b8' }}>👤 {usuarioAutenticado}</span>
          <button 
            onClick={() => setUsuarioAutenticado(null)} 
            style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Navegación de Módulos */}
      <nav style={{ background: '#1e293b', padding: '0 30px', display: 'flex', gap: '30px', borderBottom: '1px solid #334155' }}>
        <button 
          onClick={() => setVistaActual('asistencia')}
          style={{ background: 'transparent', border: 'none', color: vistaActual === 'asistencia' ? '#22c55e' : '#94a3b8', padding: '15px 0', borderBottom: vistaActual === 'asistencia' ? '2px solid #22c55e' : 'none', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Control de Asistencia
        </button>
        <button 
          onClick={() => setVistaActual('usuarios')}
          style={{ background: 'transparent', border: 'none', color: vistaActual === 'usuarios' ? '#38bdf8' : '#94a3b8', padding: '15px 0', borderBottom: vistaActual === 'usuarios' ? '2px solid #38bdf8' : 'none', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Registro y Módulos de Personal
        </button>
        <button 
          onClick={() => setVistaActual('horarios')}
          style={{ background: 'transparent', border: 'none', color: vistaActual === 'horarios' ? '#38bdf8' : '#94a3b8', padding: '15px 0', borderBottom: vistaActual === 'horarios' ? '2px solid #38bdf8' : 'none', cursor: 'pointer' }}
        >
          Asignación de Cursos y Horarios
        </button>
        <button 
          onClick={() => setVistaActual('parqueo')}
          style={{ background: 'transparent', border: 'none', color: vistaActual === 'parqueo' ? '#38bdf8' : '#94a3b8', padding: '15px 0', borderBottom: vistaActual === 'parqueo' ? '2px solid #38bdf8' : 'none', cursor: 'pointer' }}
        >
          Control de Parqueo
        </button>
      </nav>

      {/* Contenido Principal */}
      <main style={{ padding: '30px 40px', width: '100%', boxSizing: 'border-box' }}>
        <h1 style={{ textAlign: 'center', color: '#e2e8f0', fontSize: '22px', marginBottom: '25px' }}>
          Módulo de Asistencia VDS
        </h1>

        {vistaActual === 'asistencia' && (
          <>
            <AsistenciaForm 
              usuarios={usuarios} 
              registrosHoy={registros}
              onAgregarRegistro={handleAgregarRegistro} 
              onActualizarSalida={handleActualizarSalida}
            />
            <AsistenciaTable registros={registros} />
          </>
        )}

        {vistaActual === 'usuarios' && (
          <UsuarioForm onAgregarUsuario={handleAgregarUsuario} />
        )}

        {vistaActual === 'horarios' && (
          <div style={{ background: '#1e293b', padding: '30px', borderRadius: '10px', textAlign: 'center', color: '#94a3b8' }}>
            <h3>Módulo de Asignación de Cursos y Horarios en desarrollo</h3>
          </div>
        )}

        {vistaActual === 'parqueo' && (
          <div style={{ background: '#1e293b', padding: '30px', borderRadius: '10px', textAlign: 'center', color: '#94a3b8' }}>
            <h3>Módulo de Control de Parqueo en desarrollo</h3>
          </div>
        )}
      </main>
    </div>
  );
}