import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Clientes.css';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/clientes');
        setClientes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  if (loading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"></div></div>;
  if (error) return <p className="text-danger">Error al cargar los datos: {error.message}</p>;

  return (
    <div className="clientes-container container">
      <h2 className="text-center">Clientes</h2>
      <ul className="list-group">
        {clientes.map(cliente => (
          <li key={cliente._id} className="list-group-item">{cliente.nombre} - {cliente.direccion}</li>
        ))}
      </ul>
    </div>
  );
}

export default Clientes;
