import type { RegistroAsistencia } from '../../types/asistencia';

interface AsistenciaTableProps {
  registros: RegistroAsistencia[];
}

export function AsistenciaTable({ registros }: AsistenciaTableProps) {
  return (
    <div style={{ background: '#1e293b', padding: '25px', borderRadius: '10px', border: '1px solid #334155', color: '#fff' }}>
      <h3 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '20px' }}>
         Historial de Registros de Asistencia
      </h3>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#0f172a', borderBottom: '2px solid #334155', color: '#94a3b8' }}>
              <th style={{ padding: '12px' }}>Docente / Personal</th>
              <th style={{ padding: '12px' }}>Rol</th>
              <th style={{ padding: '12px' }}>Fecha</th>
              <th style={{ padding: '12px' }}>Entrada</th>
              <th style={{ padding: '12px' }}>Salida</th>
              <th style={{ padding: '12px' }}>Estado</th>
              <th style={{ padding: '12px' }}>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {registros.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                  No hay registros de asistencia guardados aún.
                </td>
              </tr>
            ) : (
              registros.map(reg => (
                <tr key={reg.id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{reg.nombreDocente}</td>
                  <td style={{ padding: '12px', color: '#94a3b8' }}>{reg.rol}</td>
                  <td style={{ padding: '12px' }}>{reg.fecha}</td>
                  <td style={{ padding: '12px', color: '#22c55e', fontWeight: 'bold' }}>{reg.horaEntrada}</td>
                  <td style={{ padding: '12px', color: '#38bdf8', fontWeight: 'bold' }}>
                    {reg.horaSalida || <span style={{ color: '#eab308', fontStyle: 'italic' }}>En establecimiento</span>}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '11px', 
                      fontWeight: 'bold',
                      background: reg.estado === 'Presente' ? '#14532d' : '#78350f',
                      color: reg.estado === 'Presente' ? '#4ade80' : '#fbbF24'
                    }}>
                      {reg.estado}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: '#94a3b8', fontSize: '13px' }}>{reg.observaciones}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}