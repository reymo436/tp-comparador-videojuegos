const express = require('express');
const router = express.Router();
const videojuegosController = require('../controllers/videojuegosController');

router.get('/', videojuegosController.getAllVideojuegos);
router.get('/:id', videojuegosController.getVideojuegoById);
router.post('/', videojuegosController.createVideojuego);
router.put('/:id', videojuegosController.updateVideojuego);
router.delete('/:id', videojuegosController.deleteVideojuego);
router.get('/comparar/:nombreParcial/:id', videojuegosController.compararVideojuegosPorNombre);
router.get('/comparar-sin-nombre/:precio/:id/:nombreParcial', videojuegosController.compararVideojuegosPorPrecioSinSimilitudNombre);

module.exports = router;