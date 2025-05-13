import { useState } from 'react';
import api from '../../api/api';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/transactions/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token'),
        },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(`${err}Erro ao enviar planilha`);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Upload de Planilha</h2>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Enviar</button>
      </form>
    </div>
  );
}
