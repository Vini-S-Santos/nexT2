import React, { useEffect, useState } from 'react';
import api from '../../api/api';
export default function Wallet() {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    api.get('/transactions/wallet', {
      headers: { Authorization: localStorage.getItem('token') },
    }).then((res) => setBalance(res.data.balance));
  }, []);
  return <h1>Saldo em pontos aprovados: {balance}</h1>;
}