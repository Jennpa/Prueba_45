// src/components/Home/Home.js
import React from 'react';
import './Home.css'; // Añadir archivo CSS para los estilos

function Home() {
  return (
    <section className="home-content">
      <h2>Bienvenido a JENCAFE</h2>
      <p>
        Descubre los mejores productos de café seleccionados especialmente para ti. Nuestra tienda virtual ofrece una
        variedad de cafés de alta calidad, desde los más tradicionales hasta los más exquisitos.
      </p>
      <p>
        Navega por nuestras categorías te invitamos a que ¡disfrutes de una experiencia única con el mejor café!
      </p>
      <img src="./imagenes/goodmorning-8838.gif"></img>
    </section>
  );
}

export default Home;
