import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/Admin/UploadPage';
import Wallet from './pages/User/Wallet';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
        <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}