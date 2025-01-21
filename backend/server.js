require('dotenv').config({ path: './.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./config/db'); // Asegúrate de que este archivo exporte la conexión correctamente

const app = express();
const PORT = process.env.PORT || 5000; // Cambia a 5000 o cualquier otro puerto // Usa el puerto de la base de datos o 5000 como predeterminado

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas de la API

// Obtener productos
app.get('/api/products', (req, res) => {
  connection.query('SELECT * FROM productos', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

// Agregar producto
app.post('/api/products', (req, res) => {
  const { nombre, precio, stock } = req.body;
  connection.query('INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)', [nombre, precio, stock], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ producto_id: results.insertId, nombre, precio, stock });
  });
});

// Modificar producto
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;
  connection.query('UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE producto_id = ?', [nombre, precio, stock, id], (error) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ producto_id: id, nombre, precio, stock });
  });
});

// Eliminar producto
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM productos WHERE producto_id = ?', [id], (error) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(204).send();
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Ruta para actualizar el stock de un producto
app.put('/api/products/:id/stock', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  // Consulta para obtener el stock actual
  connection.query(
    'SELECT stock FROM productos WHERE producto_id = ?', 
    [id], 
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      const currentStock = results[0].stock;
      const newStock = currentStock - quantity;

      // Actualizar el stock
      connection.query(
        'UPDATE productos SET stock = ? WHERE producto_id = ?', 
        [newStock, id], 
        (error) => {
          if (error) {
            return res.status(500).json({ error: error.message });
          }
          res.status(200).json({ message: 'Stock actualizado correctamente' });
        }
      );
    }
  );
});