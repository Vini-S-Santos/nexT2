import React, { useState } from 'react';
import api from '../../api/api';
export default function UploadPage() {
  const [file, setFile] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    await api.post('/transactions/upload', formData, {
      headers: { Authorization: localStorage.getItem('token') }
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Enviar Planilha</button>
    </form>
  );
}