import React, { useEffect, useState } from 'react';
import api from '../services/api';
export default function Dashboard() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const load = () => api.get('/categories').then(r => setCategories(r.data));
  useEffect(() => { load(); }, []);
  const create = async () => { await api.post('/categories', { name: newName, description: newDesc }); setNewName(''); setNewDesc(''); load(); };
  const remove = async (id: number) => { await api.delete(`/categories/${id}`); load(); };
  const inp: React.CSSProperties = { padding:10, marginRight:8, borderRadius:6, border:'1px solid #e2e8f0', fontSize:14 };
  const btn: React.CSSProperties = { padding:'10px 20px', background:'#2b6cb0', color:'#fff', border:'none', borderRadius:6, cursor:'pointer', fontWeight:'bold' };
  return (
    <div style={{ padding:32, fontFamily:'sans-serif' }}>
      <h1 style={{ color:'#1a365d' }}>Painel do Administrador</h1>
      <section style={{ marginBottom:32 }}>
        <h2>Nova Categoria</h2>
        <input style={inp} placeholder="Nome" value={newName} onChange={e => setNewName(e.target.value)} />
        <input style={inp} placeholder="Descrição" value={newDesc} onChange={e => setNewDesc(e.target.value)} />
        <button style={btn} onClick={create}>Criar</button>
      </section>
      <section>
        <h2>Categorias ({categories.length})</h2>
        {categories.map(c => (
          <div key={c.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:'1px solid #e2e8f0' }}>
            <span style={{ flex:1, fontWeight:600 }}>{c.name}</span>
            <span style={{ color:'#718096', flex:2 }}>{c.description}</span>
            <button onClick={() => remove(c.id)} style={{ background:'#e53e3e', color:'#fff', border:'none', borderRadius:6, padding:'6px 14px', cursor:'pointer' }}>Excluir</button>
          </div>
        ))}
      </section>
    </div>
  );
}
