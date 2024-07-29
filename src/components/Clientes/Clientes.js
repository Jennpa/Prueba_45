import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos: {error.message}</p>;

  return (
    <div className="clientes-container">
      <h2>Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente._id}>{cliente.nombre} - {cliente.direccion}</li>
        ))}
      </ul>
    </div>
  );
}

export default Clientes;
