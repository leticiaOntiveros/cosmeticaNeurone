const pool = require('../config/db');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

// Agregar un producto
exports.addProduct = async (req, res) => {
  const { nombre, precio, stock } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
      [nombre, precio, stock]
    );
    res.json({ id: result[0].insertId, nombre, precio, stock });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar producto', error });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error });
  }
};
