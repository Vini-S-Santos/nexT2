import React, { useEffect, useState } from 'react';
import api from '../../api/api';
export default function Statement() {
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const fetchTransactions = async () => {
    const params = {};
    if (status) params.status = status;
    if (from && to) {
      params.from = from;
      params.to = to;
    }
    const res = await api.get('/transactions/user', {
      headers: { Authorization: localStorage.getItem('token') },
      params,
    });
    setTransactions(res.data);
  };

  useEffect(() => { fetchTransactions(); }, []);

  return (
    <div>
      <h2>Extrato de Transações</h2>
      <div>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Todos os Status</option>
          <option value="Aprovado">Aprovado</option>
          <option value="Reprovado">Reprovado</option>
          <option value="Em avaliação">Em avaliação</option>
        </select>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        <button onClick={fetchTransactions}>Filtrar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Data</th>
            <th>Pontos</th>
            <th>Valor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.description}</td>
              <td>{new Date(t.transactionDate).toLocaleDateString()}</td>
              <td>{t.points}</td>
              <td>{t.value.toFixed(2)}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}