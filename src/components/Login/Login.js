import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Credenciales correctas de ejemplo
  const validUsername = 'Prueba';
  const validPassword = '123';

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificación de las credenciales ingresadas
    if (username === validUsername && password === validPassword) {
      setError(null); // Limpiar el error en caso de éxito
      setIsLoggedIn(true); // Inicio de sesión correcto
    } else {
      setError('Credenciales incorrectas');
      setIsLoggedIn(false); // No se ha iniciado sesión correctamente
    }
  };

  // Si el usuario está autenticado, mostrar la vista de medios de pago
  if (isLoggedIn) {
    return (
      <div className="payment-view-container container mt-5">
        <h2 className="text-center mb-4">Medios de Pago</h2>
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Logo Medio de Pago</th>
              <th scope="col">Medio de Pago</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                <img src="/Imagenes/Pse.jpeg" alt="PSE" className="img-fluid" style={{ width: '100px' }} />
              </td>
              <td className="font-weight-bold">PSE</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>
                <img src="/Imagenes/Contraentega.jpeg" alt="Contra Entrega" className="img-fluid" style={{ width: '100px' }} />
              </td>
              <td className="font-weight-bold">Contra Entrega</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // Si no está autenticado, mostrar el formulario de inicio de sesión
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

