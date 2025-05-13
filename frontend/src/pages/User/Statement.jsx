import React, { useEffect, useState } from 'react';
import api from '../../api/api';

export default function Statement({ isAdmin = false }) {
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [cpf, setCpf] = useState('');
  const [product, setProduct] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const fetchTransactions = async () => {
    const params = {};
    if (status) params.status = status;
    if (from && to) {
      params.from = from;
      params.to = to;
    }
    if (isAdmin) {
      if (cpf) params.cpf = cpf;
      if (product) params.product = product;
      if (min) params.min = min;
      if (max) params.max = max;
    }

    try {
      const url = isAdmin ? '/transactions/report' : '/transactions/user';
      const res = await api.get(url, {
        headers: { Authorization: localStorage.getItem('token') },
        params,
      });
      setTransactions(res.data);
    } catch (err) {
      console.error('Erro ao buscar transações:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Extrato de Transações</h2>

      <div className="flex gap-2 mb-4 flex-wrap">
        {isAdmin && (
          <input
            className="border p-2"
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        )}
        {isAdmin && (
          <input
            className="border p-2"
            type="text"
            placeholder="Produto"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        )}
        <select
          className="border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Todos os Status</option>
          <option value="Aprovado">Aprovado</option>
          <option value="Reprovado">Reprovado</option>
          <option value="Em avaliação">Em avaliação</option>
        </select>
        <input
          className="border p-2"
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          className="border p-2"
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        {isAdmin && (
          <>
            <input
              className="border p-2"
              type="number"
              step="0.01"
              placeholder="Valor mínimo"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
            <input
              className="border p-2"
              type="number"
              step="0.01"
              placeholder="Valor máximo"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </>
        )}

        <button
          onClick={fetchTransactions}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Filtrar
        </button>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Descrição</th>
            <th className="border px-2 py-1">Data</th>
            <th className="border px-2 py-1">Pontos</th>
            <th className="border px-2 py-1">Valor</th>
            <th className="border px-2 py-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td className="border px-2 py-1">{t.description}</td>
              <td className="border px-2 py-1">{new Date(t.transactionDate).toLocaleDateString()}</td>
              <td className="border px-2 py-1">{t.points}</td>
              <td className="border px-2 py-1">R$ {t.value.toFixed(2)}</td>
              <td className="border px-2 py-1">{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
