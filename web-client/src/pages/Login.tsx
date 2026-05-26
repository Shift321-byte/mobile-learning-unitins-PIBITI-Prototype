import React, { useState } from 'react';
import api from '../services/api';
export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.user.role !== 'admin') { setError('Acesso restrito a administradores'); return; }
      localStorage.setItem('@token', res.data.token);
      onLogin();
    } catch { setError('Credenciais inválidas'); }
  };
  const inp: React.CSSProperties = { width:'100%', padding:12, marginBottom:12, borderRadius:8, border:'1px solid #e2e8f0', fontSize:15, boxSizing:'border-box' };
  const btn: React.CSSProperties = { width:'100%', padding:12, background:'#2b6cb0', color:'#fff', border:'none', borderRadius:8, fontSize:16, fontWeight:'bold', cursor:'pointer' };
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100vh', background:'#f0f4f8' }}>
      <div style={{ background:'#fff', padding:32, borderRadius:12, width:340, boxShadow:'0 4px 16px rgba(0,0,0,0.08)' }}>
        <h2 style={{ color:'#1a365d', marginBottom:8 }}>Painel Admin</h2>
        <p style={{ color:'#718096', marginBottom:24 }}>Mobile Learning – UNITINS</p>
        {error && <p style={{ color:'red', marginBottom:12 }}>{error}</p>}
        <input style={inp} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input style={inp} type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
        <button style={btn} onClick={handleSubmit}>Entrar</button>
      </div>
    </div>
  );
}
