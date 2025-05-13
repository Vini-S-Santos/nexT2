import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (err) {
        console.error("Token inválido", err);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
