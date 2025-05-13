import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Header from '../../components/Header';

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/transactions/wallet', {
      headers: { Authorization: localStorage.getItem('token') }
    })
      .then((res) => setBalance(res.data.balance))
      .catch((err) => {
        console.error('Erro ao buscar saldo:', err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] px-4">
        <h1 className="text-2xl font-bold text-green-700 mb-6">
          Saldo em pontos aprovados: {balance}
        </h1>

        <button
          onClick={() => navigate('/statement')}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Voltar para o Extrato
        </button>
      </div>
    </div>
  );
}
