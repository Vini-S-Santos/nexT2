import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'; // ✅ importar biblioteca xlsx
import api from '../../api/api';
import Header from '../../components/Header';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const requiredHeaders = [
    'CPF',
    'Descrição da transação',
    'Data da transação',
    'Valor em pontos',
    'Valor',
    'Status'
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const fileExtension = selectedFile.name.split('.').pop();
    if (fileExtension !== 'xlsx') {
      setMessage('Formato inválido. Apenas arquivos .xlsx são permitidos.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });

      if (!json.length) {
        setMessage('Planilha vazia.');
        return;
      }

      const headers = Object.keys(json[0]);
      const missing = requiredHeaders.filter(h => !headers.includes(h));

      if (missing.length > 0) {
        setMessage(`Colunas obrigatórias ausentes: ${missing.join(', ')}`);
        return;
      }

      setMessage('');
      setFile(selectedFile);
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Nenhum arquivo válido selecionado.');
      return;
    }

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
      setMessage('Erro ao enviar planilha');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-4">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h2 className="text-2xl font-bold mb-6">Upload de Planilha</h2>

        {message && (
          <p className="mb-4 text-center text-sm text-red-700 font-medium">{message}</p>
        )}

        <form onSubmit={handleUpload} className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="fileUpload"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Escolher Arquivo
            </label>
            <span className="text-sm text-gray-700 break-words">
              {file ? file.name : 'Nenhum arquivo selecionado'}
            </span>
            <input
              id="fileUpload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".xlsx"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={() => navigate('/statement')}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
