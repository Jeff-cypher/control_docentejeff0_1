import { useState } from 'react';
import type { UsuarioSistema, RegistroAsistencia, EstadoAsistencia } from '../../types/asistencia';

interface AsistenciaFormProps {
  usuarios: UsuarioSistema[];
  registrosHoy: RegistroAsistencia[];
  onAgregarRegistro: (registro: RegistroAsistencia) => void;
  onActualizarSalida: (idRegistro: string, horaSalida: string) => void;
}

export function AsistenciaForm({ 
  usuarios, 
  registrosHoy, 
  onAgregarRegistro, 
  onActualizarSalida 
}: AsistenciaFormProps) {
  const [usuarioSeleccionadoId, setUsuarioSeleccionadoId] = useState('');
  const [usuarioInput, setUsuarioInput] = useState('');
  const [claveInput, setClaveInput] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [verificandoUbicacion, setVerificandoUbicacion] = useState(false);
  const [accionActual, setAccionActual] = useState<'entrada' | 'salida' | null>(null);

  const LATITUD_COLEGIO = 14.499033480328578; 
  const LONGITUD_COLEGIO = -90.5614174241245;
  const RADIO_PERMITIDO_METROS = 20000; // Ampliado para pruebas locales

  const calcularDistanciaMetros = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const procesarMarcaje = (tipo: 'entrada' | 'salida') => {
    if (!usuarioSeleccionadoId) {
      alert('Por favor, seleccione un personal de la lista.');
      return;
    }

    if (!usuarioInput || !claveInput) {
      alert('Por seguridad, debe ingresar el usuario y la clave correspondiente para registrar la asistencia.');
      return;
    }

    const usuarioElegido = usuarios.find(u => u.id === usuarioSeleccionadoId);

    if (!usuarioElegido) {
      alert('El usuario seleccionado no es válido.');
      return;
    }

    if (usuarioElegido.usuario !== usuarioInput || usuarioElegido.clave !== claveInput) {
      alert('Error de autenticación: El usuario y la clave ingresados no corresponden al personal seleccionado.');
      return;
    }

    setVerificandoUbicacion(true);
    setAccionActual(tipo);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setVerificandoUbicacion(false);
        setAccionActual(null);
        const { latitude, longitude } = position.coords;
        
        const distancia = calcularDistanciaMetros(latitude, longitude, LATITUD_COLEGIO, LONGITUD_COLEGIO);

        if (distancia > RADIO_PERMITIDO_METROS) {
          alert(`Ubicación inválida: Estás a ${Math.round(distancia)} metros del Colegio Valle del Saber. Debes encontrarte dentro del establecimiento para poder registrar asistencia.`);
          return;
        }

        const ahora = new Date();
        const fechaHoy = ahora.toISOString().split('T')[0];
        const horaFormateada = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (tipo === 'salida') {
          const registroPendiente = registrosHoy.find(
            r => r.idUsuario === usuarioElegido.id && r.fecha === fechaHoy && !r.horaSalida
          );

          if (!registroPendiente) {
            alert(`No se encontró un registro de ENTRADA activo hoy para ${usuarioElegido.nombre}. Debe marcar entrada primero.`);
            return;
          }

          onActualizarSalida(registroPendiente.id, horaFormateada);
          alert(`Hora de SALIDA registrada con éxito para ${usuarioElegido.nombre} (${horaFormateada}). Buen retorno.`);
        } else {
          const hora = ahora.getHours();
          const minutos = ahora.getMinutes();
          const horaActualNum = hora + minutos / 60;

          let estadoAsistencia: EstadoAsistencia = 'Presente';
          if (horaActualNum > 7.0) {
            estadoAsistencia = 'Tardanza';
          }

          const nuevoRegistro: RegistroAsistencia = {
            id: Date.now().toString(),
            idUsuario: usuarioElegido.id,
            nombreDocente: `${usuarioElegido.nombre} ${usuarioElegido.apellidos}`,
            rol: usuarioElegido.roles.join(', '),
            fecha: fechaHoy,
            horaEntrada: horaFormateada,
            horaSalida: undefined,
            estado: estadoAsistencia,
            observaciones: observaciones || `Validado por GPS en Colegio Valle del Saber. Distancia: ${Math.round(distancia)}m`
          };

          onAgregarRegistro(nuevoRegistro);
          alert(`Asistencia de ENTRADA registrada con éxito para ${usuarioElegido.nombre} (${estadoAsistencia}).`);
        }
        
        setUsuarioSeleccionadoId('');
        setUsuarioInput('');
        setClaveInput('');
        setObservaciones('');
      },
      () => {
        setVerificandoUbicacion(false);
        setAccionActual(null);
        alert('No se pudo verificar su ubicación GPS. Asegúrese de activar el GPS en su dispositivo y permitir el acceso a la ubicación en el navegador.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  return (
    <div style={{ background: '#1e293b', padding: '25px', borderRadius: '10px', border: '1px solid #334155', color: '#fff', marginBottom: '25px' }}>
      <h3 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '20px', textAlign: 'center' }}>
        Control de Asistencia Seguro (Entrada y Salida por GPS)
      </h3>
      <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', marginBottom: '15px' }}>
        Seleccione su nombre y confirme con su usuario y clave. Se validará automáticamente su presencia en el <strong>Colegio Valle del Saber</strong>.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', alignItems: 'end' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Seleccionar Personal:</label>
          <select 
            value={usuarioSeleccionadoId} 
            onChange={e => setUsuarioSeleccionadoId(e.target.value)}
            style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
          >
            <option value="">-- Seleccionar personal --</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id}>
                {u.nombre} {u.apellidos} ({u.roles.join(', ')})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Usuario y Clave de Confirmación:</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              value={usuarioInput}
              onChange={e => setUsuarioInput(e.target.value)}
              placeholder="Usuario"
              style={{ width: '50%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
            />
            <input 
              type="password" 
              value={claveInput}
              onChange={e => setClaveInput(e.target.value)}
              placeholder="Clave"
              style={{ width: '50%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Observaciones:</label>
          <input 
            type="text" 
            value={observaciones}
            onChange={e => setObservaciones(e.target.value)}
            placeholder="Opcional (Ej. Justificante de permiso)"
            style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }}
          />
        </div>

        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
          <button 
            type="button" 
            onClick={() => procesarMarcaje('entrada')}
            disabled={verificandoUbicacion}
            style={{ background: '#22c55e', color: '#0f172a', border: 'none', padding: '12px 25px', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}
          >
            {verificandoUbicacion && accionActual === 'entrada' ? 'Validando GPS...' : 'Registrar Hora de Entrada'}
          </button>

          <button 
            type="button" 
            onClick={() => procesarMarcaje('salida')}
            disabled={verificandoUbicacion}
            style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '12px 25px', borderRadius: '6px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}
          >
            {verificandoUbicacion && accionActual === 'salida' ? 'Validando GPS...' : 'Registrar la Hora de Salida'}
          </button>
        </div>

      </div>
    </div>
  );
}