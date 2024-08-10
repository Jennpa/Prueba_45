import React, { useEffect, useState } from 'react';
import './Products.css'; // Asegúrate de tener un archivo CSS para estilizar el componente
import axios from 'axios';

function Products() {
    const [products, setProducts] = useState([]);    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                const response = await fetch('http://localhost:3001/productos', {
                    headers: {
                        'Authorization': 'Bearer YOUR_TOKEN_HERE' // Reemplaza 'YOUR_TOKEN_HERE' con tu token real
                    }
                });
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

    const handleSubmit = async (e) => {
        e.preventDefault();        
        try {
            const response = await axios.post('http://localhost:3001/productos/store', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_TOKEN_HERE' // Reemplaza 'YOUR_TOKEN_HERE' con tu token real
                }
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Error al registrar el producto: ', error);
        }
    }; 

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar los datos: {error.message}</p>;
    if (products.length === 0) return <p>No hay productos disponibles.</p>;

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
                        <button>Agregar </button>
                    </div>
                ))}
            </div>          
        </section>
    );
}

export default Products;
