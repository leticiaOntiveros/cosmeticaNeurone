const express = require('express');
const router = express.Router();
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProductStock, // Agregar el controlador para actualizar el stock
} = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);

// Nueva ruta para actualizar el stock
router.put('/:id/stock', updateProductStock);

module.exports = router;
