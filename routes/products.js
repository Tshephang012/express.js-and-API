const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { products, findById, add, update, remove } = require('../models/product');
const validateProduct = require('../middleware/validateProduct');

// GET all with filter + pagination
router.get('/', (req, res) => {
  let result = [...products];
  const { category, page = 1, limit = 10 } = req.query;

  if (category) {
    result = result.filter(p => p.category === category);
  }

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  res.json(result.slice(start, end));
});

// Search by name
router.get('/search', (req, res) => {
  const { name } = req.query;
  const result = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  res.json(result);
});

// Product stats
router.get('/stats', (req, res) => {
  const counts = {};
  products.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  res.json(counts);
});

// GET by ID
router.get('/:id', (req, res, next) => {
  const product = findById(req.params.id);
  if (!product) return next(new Error('Product not found'));
  res.json(product);
});

// POST create
router.post('/', validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  add(newProduct);
  res.status(201).json(newProduct);
});

// PUT update
router.put('/:id', validateProduct, (req, res, next) => {
  const updated = update(req.params.id, req.body);
  if (!updated) return next(new Error('Product not found'));
  res.json(updated);
});

// DELETE
router.delete('/:id', (req, res, next) => {
  const success = remove(req.params.id);
  if (!success) return next(new Error('Product not found'));
  res.status(204).send();
});

module.exports = router;
