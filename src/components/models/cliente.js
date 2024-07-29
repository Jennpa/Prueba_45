// src/models/Cliente.js
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  direccion: {
    type: String,
    required: true,
    trim: true
  },
  metodoPago: {
    type: String,
    enum: ['Efectivo', 'PSE'],
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
