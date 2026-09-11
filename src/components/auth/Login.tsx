import React, { useState } from 'react';
import logoVDS from '../../assets/vds.png';

interface LoginProps {
  onLoginExitoso: (nombreUsuario: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginExitoso }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (usuario === 'admin' && password === '1234') {
      onLoginExitoso('Administrador VDS');
    } else {
      setError('Usuario o contraseña incorrectos (Usa: admin / 1234)');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      background: 'linear-gradient(135deg, #0056b3 0%, #28a745 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: '420px', 
        padding: '40px', 
        background: '#fff', 
        borderRadius: '12px', 
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        borderTop: '6px solid #ffc107' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <img 
            src={logoVDS} 
            alt="Logo Colegio Valle del Saber" 
            style={{ width: '80px', height: '80px', objectFit: 'contain', marginBottom: '12px' }} 
          />
          <h2 style={{ color: '#0056b3', margin: '0 0 8px 0', fontSize: '26px' }}>Colegio Valle del Saber</h2>
          <p style={{ color: '#28a745', margin: 0, fontWeight: 'bold', fontSize: '14px' }}>Sistema de Control Docente</p>
        </div>

        {error && (
          <div style={{ background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '13px', borderLeft: '4px solid #dc3545' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#333', fontWeight: 'bold' }}>Usuario:</label>
            <input 
              type="text" 
              value={usuario} 
              onChange={(e) => setUsuario(e.target.value)} 
              placeholder="Ej. admin"
              required 
              style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#333', fontWeight: 'bold' }}>Contraseña:</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={mostrarPassword ? 'text' : 'password'} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Ej. 1234"
                required 
                style={{ width: '100%', padding: '12px', paddingRight: '45px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px', outline: 'none' }}
              />
              <button 
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  color: '#666'
                }}
                title={mostrarPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {mostrarPassword ? (
                  // Icono de ojo tachado (Ocultar)
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  // Icono de ojo abierto (Ver)
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              background: '#28a745', 
              color: '#fff', 
              padding: '12px', 
              border: 'none', 
              borderRadius: '6px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'background 0.2s'
            }}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};