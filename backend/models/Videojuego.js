const mongoose = require('mongoose');

const VideojuegoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  anno: {
    type: Number,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String, 
    required: true,
  },
});

module.exports = mongoose.model('Videojuego', VideojuegoSchema);
