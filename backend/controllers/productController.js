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

// Actualizar el stock de un producto
exports.updateProductStock = async (req, res) => {
  const { id } = req.params; // ID del producto
  const { quantity } = req.body; // Cantidad a descontar

  // Validar que `id` y `quantity` sean números válidos
  if (!id || isNaN(id)) {
    return res.status(400).json({ message: 'El ID del producto es inválido.' });
  }

  if (!quantity || isNaN(quantity)) {
    return res.status(400).json({ message: 'La cantidad es inválida.' });
  }

  try {
    // Verificar si el producto existe
    const [product] = await pool.query('SELECT stock FROM productos WHERE id = ?', [id]);

    if (product.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    const currentStock = product[0].stock;
    const newStock = currentStock - Number(quantity);

    if (newStock < 0) {
      return res.status(400).json({ message: 'Stock insuficiente.' });
    }

    // Actualizar el stock del producto
    await pool.query('UPDATE productos SET stock = ? WHERE id = ?', [newStock, id]);

    res.json({ message: 'Stock actualizado correctamente.', newStock });
  } catch (error) {
    console.error('Error al actualizar el stock:', error);
    res.status(500).json({ message: 'Error al actualizar el stock.', error });
  }
};