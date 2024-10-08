import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
  return (
    <section className="home-content container text-center">
      <h2 className="mb-4">Bienvenido a JENCAFE</h2>
      <p className="lead">
        Descubre los mejores productos de café seleccionados especialmente para ti. Nuestra tienda virtual ofrece una
        variedad de cafés de alta calidad, desde los más tradicionales hasta los más exquisitos.
      </p>
      <p className="lead">
        Navega por nuestras categorías y disfruta de una experiencia única con el mejor café!
      </p>
      <img src="./imagenes/goodmorning-8838.gif" alt="Good Morning" className="img-fluid"/>
    </section>
  );
}

export default Home;
