// src/components/Login/Login.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Ajusta la ruta según la ubicación de AuthContext
import './Login.css'; // Añadir archivo CSS para los estilos

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(username, password);
      console.log(success);
      if (!success) {
        setError('Credenciales incorrectas');

      } else {
        //setError(null);
        setError('Credenciales correctas');
      }
    } catch (error) {
      setError('Error en la autenticación');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
