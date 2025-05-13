import React, { useEffect, useState } from 'react';
import api from '../../api/api';

export default function Wallet() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    api.get('/transactions/wallet')
      .then((res) => setBalance(res.data.balance))
      .catch((err) => {
        console.error('Erro ao buscar saldo:', err);
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-green-700">
        Saldo em pontos aprovados: {balance}
      </h1>
    </div>
  );
}
