import React, { useEffect, useState } from 'react';
import './Products.css'; // Asegúrate de tener un archivo CSS para estilizar el componente
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



function Products() {
    const [products, setProducts] = useState([]);    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/productos'); // Cambiado a '/productos' para obtener productos
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data); // Actualiza la lista de productos
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar los datos: {error.message}</p>;
    if (products.length === 0) return <p>No hay productos disponibles.</p>;

    const handleSubmit = async (e) => {
        e.preventDefault();        
        try {
            const response = await axios.post('http://localhost:3001/productos/store', formData, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              alert(response.data.message);
          } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al registrar el producto: ', error);
          }
     }; 
    return (
        <section className="content">            
            <div>
            <h2>Nuestros Productos</h2>                
            </div>
            <div className="product-grid">
                {products.map((product) => (
                    <div className="product" key={product._id}>
                        <img src={product.imagen} alt={product.nombre} /> {/* Cambiado a 'nombre' */}
                        <h3>{product.nombre}</h3> {/* Cambiado a 'nombre' */}
                        <p>Precio: {product.precio} COP</p>
                        <button>Agregar al Carrito</button>
                    </div>
                ))}
            </div>          
        </section>
    );
}

export default Products;
