const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured, page = 1, limit = 10 } = req.query;

    let query = { active: true };

    // Filtrar por categoría
    if (category && category !== 'todos') {
      query.category = category;
    }

    // Filtrar productos destacados
    if (featured) {
      query.featured = featured === 'true';
    }

    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    console.log('🔍 [DEBUG] Iniciando consulta de productos...');
    
    const { category, featured, page = 1, limit = 10 } = req.query;
    console.log('📋 [DEBUG] Query params:', req.query);

    let query = { active: true };
    console.log('🔍 [DEBUG] Query base:', query);

    // Filtrar por categoría
    if (category && category !== 'todos') {
      query.category = category;
    }

    // Filtrar productos destacados
    if (featured) {
      query.featured = featured === 'true';
    }

    console.log('🔍 [DEBUG] Query final:', query);

    // TEST: Consulta sin filtros primero
    console.log('📦 [DEBUG] Probando consulta sin filtros...');
    const allProducts = await Product.find({});
    console.log('📦 [DEBUG] Total productos en DB:', allProducts.length);
    
    if (allProducts.length > 0) {
      console.log('🔍 [DEBUG] Primer producto:', {
        name: allProducts[0].name,
        active: allProducts[0].active,
        category: allProducts[0].category
      });
    }

    // Consulta con filtros
    console.log('🔍 [DEBUG] Ejecutando consulta con filtros...');
    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);
      // .sort({ createdAt: -1 }); // ← Temporalmente comentado

    console.log('✅ [DEBUG] Productos encontrados:', products.length);

    const total = await Product.countDocuments(query);
    console.log('📊 [DEBUG] Total documentos:', total);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('❌ [DEBUG] Error en ruta products:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;