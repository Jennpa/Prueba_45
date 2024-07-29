// src/components/Products/Products.js
import React, { useEffect, useState } from 'react';

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/cafes')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <section className="content">
            <h2>Nuestros Productos</h2>            
            {products.map((product, index) => (
                <div className="product" key={index}>
                    <img src={`path_to_image/${product.image}`} alt={product.nombreCafe} />
                    <h3>{product.nombreCafe}</h3>
                    <p>Precio: {product.precio} COP</p>
                    <button>Agregar </button>
                </div>
            ))}
        </section>
    );
}

export default Products;
