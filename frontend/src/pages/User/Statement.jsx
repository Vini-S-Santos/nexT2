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
  
    try {
      const res = await api.get('/transactions/user', {
        headers: { Authorization: localStorage.getItem('token') },
        params,
      });
      setTransactions(res.data);
    } catch (err) {
      console.error("Erro ao buscar transações:", err);
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Extrato de Transações</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded w-48"
        >
          <option value="">Todos os Status</option>
          <option value="Aprovado">Aprovado</option>
          <option value="Reprovado">Reprovado</option>
          <option value="Em avaliação">Em avaliação</option>
        </select>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={fetchTransactions}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Filtrar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Descrição</th>
              <th className="p-3 text-left">Data</th>
              <th className="p-3 text-left">Pontos</th>
              <th className="p-3 text-left">Valor</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{t.description}</td>
                <td className="p-3">{new Date(t.transactionDate).toLocaleDateString()}</td>
                <td className="p-3">{t.points}</td>
                <td className="p-3">R$ {t.value.toFixed(2)}</td>
                <td className={`p-3 font-medium ${t.status === 'Aprovado' ? 'text-green-600' : t.status === 'Reprovado' ? 'text-red-500' : 'text-yellow-600'}`}>
                  {t.status}
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Nenhuma transação encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
