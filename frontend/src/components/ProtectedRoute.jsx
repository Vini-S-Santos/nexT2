import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/statement" />;
    }

    const childWithProps = React.cloneElement(children, {
      isAdmin: userRole === 'admin',
    });

    return childWithProps;
  } catch (err) {
    console.error('Erro ao decodificar token:', err);
    return <Navigate to="/login" />;
  }
}
