const Videojuego = require('../models/Videojuego');

// Obtener todos los videojuegos
exports.getAllVideojuegos = async (req, res) => {
  try {
    const videojuegos = await Videojuego.find();
    res.json(videojuegos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un videojuego por ID
exports.getVideojuegoById = async (req, res) => {
  try {
    const videojuego = await Videojuego.findById(req.params.id);
    console.log("el id de mi db es ", req.params.id)
    if (!videojuego) return res.status(404).json({ message: 'Videojuego no encontrado' });
    res.json(videojuego);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo videojuego
exports.createVideojuego = async (req, res) => {
  const { nombre, anno, precio, imagen } = req.body;
  try {
    const newVideojuego = new Videojuego({ nombre, anno, precio, imagen });
    const savedVideojuego = await newVideojuego.save();
    res.status(201).json(savedVideojuego);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// Actualizar un videojuego
exports.updateVideojuego = async (req, res) => {
  const { nombre, anno, precio, imagen } = req.body;
  try {
    const videojuego = await Videojuego.findOneAndUpdate(
      { _id: req.params.id },
      { nombre, anno, precio, imagen },
      { new: true }
    );
    if (!videojuego) {
      return res.status(404).json({ message: 'Videojuego no encontrado' });
    }
    res.json(videojuego);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Eliminar un videojuego
exports.deleteVideojuego = async (req, res) => {
  try {
    const videojuego = await Videojuego.findByIdAndDelete(req.params.id);

    if (!videojuego) {
      return res.status(404).json({ message: 'Videojuego no encontrado' });
    }

    res.json({ message: 'Videojuego eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
