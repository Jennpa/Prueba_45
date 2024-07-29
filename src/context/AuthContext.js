import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        // Lógica de autenticación
        if (username === 'admin' && password === 'admin') {
            setUser({ username });
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
