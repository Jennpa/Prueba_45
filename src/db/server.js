// src/db/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { Cliente, Pedido, Factura, Inventario, Cafe, Producto } = require('../components/models/models');
const { ObjectId } = require('mongodb');

const app = express();

// Configuración de middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de sesión
app.use(session({
  secret: 'Zoe*', // Se cambio la clave para el entorno de producción.
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/jencafe' }), // Asegúrate de tener MongoDB corriendo
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 día de duración para la cookie de sesión
}));

// Middleware para proteger rutas (eliminado de las rutas que no requieren autenticación)
const authMiddleware = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.status(401).json({ message: 'No autorizado' });
  }
};

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === 'prueba' && password === 'prueba') { // esta es la parte de incio de sesion en acceso usuarios
    req.session.username = username; // Guardar en sesión
    res.json({ message: 'Inicio de sesión exitoso' });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'No se pudo cerrar la sesión' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Cierre de sesión exitoso' });
  });
});

// Rutas no protegidas
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/cafes', async (req, res) => {
  try {
    const cafes = await Cafe.find();
    res.json(cafes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rutas protegidas (usando authMiddleware)
// Rutas no protegidas
app.post('/productos/store', async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    
    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      precio,
      stock
    });

    await nuevoProducto.save();
    res.json({ message: 'Registro creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete(`/productos/delete/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Producto.findByIdAndDelete(id);

    if (result) {
      res.sendStatus(204); // No Content
    } else {
      res.sendStatus(404); // Not Found
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send(error); // Internal Server Error
  }
});

app.put(`/productos/update/:id`, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const result = await Producto.findByIdAndUpdate(id, updates, { new: true });

    if (result) {
      res.send(result);
    } else {
      res.sendStatus(404); // Not Found
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send(error); // Internal Server Error
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});