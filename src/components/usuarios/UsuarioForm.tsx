import { useState } from 'react';
import type { UsuarioSistema, RolUsuario } from '../../types/asistencia';

interface UsuarioFormProps {
  onAgregarUsuario: (nuevoUsuario: UsuarioSistema) => void;
}

export function UsuarioForm({ onAgregarUsuario }: UsuarioFormProps) {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [rolesSeleccionados, setRolesSeleccionados] = useState<RolUsuario[]>(['Docente']);

  const rolesDisponibles: RolUsuario[] = ['Docente', 'Coordinador', 'Limpieza', 'Seguridad', 'Administracion'];

  const handleRolChange = (rol: RolUsuario) => {
    if (rolesSeleccionados.includes(rol)) {
      if (rolesSeleccionados.length > 1) {
        setRolesSeleccionados(rolesSeleccionados.filter(r => r !== rol));
      }
    } else {
      setRolesSeleccionados([...rolesSeleccionados, rol]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !apellidos || !email || !usuario || !clave) {
      alert('Por favor, complete los campos obligatorios.');
      return;
    }

    const nuevoUsuario: UsuarioSistema = {
      id: Date.now().toString(),
      nombre,
      apellidos,
      email,
      telefono: telefono || 'Sin teléfono',
      usuario,
      clave,
      roles: rolesSeleccionados,
      qrCode: `VDS-USER-${usuario}-${Date.now().toString().slice(-4)}`
    };

    onAgregarUsuario(nuevoUsuario);
    alert(`¡Usuario ${nombre} ${apellidos} registrado con éxito!`);

    // Limpiar formulario
    setNombre('');
    setApellidos('');
    setEmail('');
    setTelefono('');
    setUsuario('');
    setClave('');
    setRolesSeleccionados(['Docente']);
  };

  return (
    <div style={{ background: '#1e293b', padding: '30px', borderRadius: '10px', border: '1px solid #334155', color: '#fff' }}>
      <h3 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
         Nuevo usuario (Registro de Personal VDS)
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px', alignItems: 'start' }}>
        
        {/* Campos principales */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Nombre</label>
            <input 
              type="text" 
              value={nombre} 
              onChange={e => setNombre(e.target.value)} 
              placeholder="Ej. Juan Carlos" 
              style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Apellidos</label>
            <input 
              type="text" 
              value={apellidos} 
              onChange={e => setApellidos(e.target.value)} 
              placeholder="Ej. Pérez Gómez" 
              style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="correo@valledelsaber.edu.gt" 
              style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Teléfono</label>
            <input 
              type="text" 
              value={telefono} 
              onChange={e => setTelefono(e.target.value)} 
              placeholder="Ej. 5555-5555" 
              style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Usuario</label>
            <input 
              type="text" 
              value={usuario} 
              onChange={e => setUsuario(e.target.value)} 
              placeholder="admin" 
              style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Clave</label>
            <input 
              type="password" 
              value={clave} 
              onChange={e => setClave(e.target.value)} 
              placeholder="••••" 
              style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* Panel de Roles del Sistema */}
        <div style={{ background: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #334155' }}>
          <h4 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '15px', fontSize: '14px' }}>Roles del Sistema</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rolesDisponibles.map(rol => (
              <label key={rol} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={rolesSeleccionados.includes(rol)} 
                  onChange={() => handleRolChange(rol)}
                  style={{ accentColor: '#38bdf8', width: '16px', height: '16px' }}
                />
                {rol}
              </label>
            ))}
          </div>
        </div>

        {/* Botones de acción inferiores */}
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '10px' }}>
          <button 
            type="button" 
            onClick={() => {
              setNombre(''); setApellidos(''); setEmail(''); setTelefono(''); setUsuario(''); setClave('');
            }}
            style={{ background: '#475569', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Limpiar
          </button>
          <button 
            type="submit" 
            style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Guardar Usuario
          </button>
        </div>

      </form>
    </div>
  );
}