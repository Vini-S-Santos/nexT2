import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Header from '../../components/Header';

export default function Statement({ isAdmin = false }) {
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [product, setProduct] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const navigate = useNavigate();

  const handleCpfChange = (e) => {
    const value = e.target.value;
    const onlyNumbers = value.replace(/\D/g, '');

    if (value !== onlyNumbers) {
      setCpfError('O CPF deve conter apenas números');
    } else {
      setCpfError('');
    }

    setCpf(onlyNumbers);
  };

  const fetchTransactions = async () => {
    if (cpfError) return;

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
    <div className="p-4 relative min-h-screen bg-gray-100">
      <Header />

      <h2 className="text-xl font-semibold mb-4">Extrato de Transações</h2>

      <div className="flex gap-2 mb-4 flex-wrap">
        {isAdmin && (
          <div className="flex flex-col">
            <input
              className="border p-2"
              type="text"
              placeholder="CPF (somente números)"
              value={cpf}
              onChange={handleCpfChange}
            />
            {cpfError && <span className="text-red-500 text-sm">{cpfError}</span>}
          </div>
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

      <table className="w-full border-collapse border bg-white shadow">
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

      <button
        onClick={() => navigate('/wallet')}
        className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 shadow-md"
      >
        Ver Saldo
      </button>

      {isAdmin && (
        <div className="fixed bottom-4 left-4 flex flex-col gap-2">
          <button
            onClick={() => navigate('/admin/upload')}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 shadow-md"
          >
            Upload de Planilha
          </button>
        </div>
      )}
    </div>
  );
}
