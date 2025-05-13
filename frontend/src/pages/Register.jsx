import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    password: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const [cpfError, setCpfError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cpf') {
      const onlyNumbers = value.replace(/\D/g, '');
      if (value !== onlyNumbers) {
        setCpfError('O CPF deve conter apenas números');
      } else {
        setCpfError('');
      }

      setFormData(prev => ({ ...prev, [name]: onlyNumbers }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (cpfError) return;
  
    try {
      await api.post('/users/register', formData);
      navigate('/login');
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao registrar usuário';
  
      if (message.includes('cpf')) {
        setCpfError('CPF já cadastrado.');
      } else if (message.includes('email')) {
        setError('E-mail já cadastrado.');
      } else {
        setError(message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 font-semibold">Cadastro</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          className="border p-2 w-full mb-2"
          type="text"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 w-full mb-2"
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 w-full mb-2"
          type="text"
          name="cpf"
          placeholder="CPF (apenas números)"
          value={formData.cpf}
          onChange={handleChange}
          required
        />
        {cpfError && <p className="text-red-500 text-sm mb-2">{cpfError}</p>}

        <input
          className="border p-2 w-full mb-2"
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          className="border p-2 w-full mb-4"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 mt-2 rounded hover:bg-blue-600"
        >
          Registrar
        </button>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="mt-3 w-full text-blue-600 hover:underline text-sm"
        >
          Já tem uma conta? Voltar para o Login
        </button>
      </form>
    </div>
  );
}
