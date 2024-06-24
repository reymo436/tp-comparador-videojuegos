const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/videojuegos', require('./routes/videojuegos'));

// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
