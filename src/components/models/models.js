// src/components/models/models.js
const mongoose = require('mongoose');

// Definición de esquemas

// Schema de Cliente
const clienteSchema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    metodoPago: { type: String, enum: ['Efectivo', 'PSE'] },
    email: String,
});

// Schema de Pedido
const pedidoSchema = new mongoose.Schema({
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    cafeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cafe' },
    estadoPedido: { type: String, enum: ['Pendiente', 'Completado'] },
    metodoPago: { type: String, enum: ['Efectivo', 'Tarjeta'] }
});

// Schema de Factura
const facturaSchema = new mongoose.Schema({
    pedidoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' },
    totalPagar: Number
});

// Schema de Inventario
const inventarioSchema = new mongoose.Schema({
    cafeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cafe' },
    cantidad: Number
});

// Schema de Cafe
const cafeSchema = new mongoose.Schema({
    nombreCafe: String,
    precio: Number,
    tipo: { type: String, enum: ['Arábica', 'Robusta'] }
});

// Schema de Producto
const productoSchema = new mongoose.Schema({    
    nombre: String,
    descripcion: String,
    precio: Number,
    stock: Number
});

// Definición de modelos
const Producto = mongoose.model('Producto', productoSchema);
const Cliente = mongoose.model('Cliente', clienteSchema);
const Pedido = mongoose.model('Pedido', pedidoSchema);
const Factura = mongoose.model('Factura', facturaSchema);
const Inventario = mongoose.model('Inventario', inventarioSchema);
const Cafe = mongoose.model('Cafe', cafeSchema);

module.exports = { Cliente, Pedido, Factura, Inventario, Cafe, Producto };
