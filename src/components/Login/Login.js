import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(username, password);
      if (!success) {
        setError('Credenciales incorrectas');
      } else {
        setError('Credenciales correctas');
      }
    } catch (error) {
      setError('Error en la autenticación');
    }
  };

  return (
    <div className="login-container container">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
