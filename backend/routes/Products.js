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

    if (category && category !== 'todos') {
      query.category = category;
    }

    if (featured) {
      query.featured = featured === 'true';
    }

    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);

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

// ✅ NUEVO: Create product
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', async (req, res) => {
  try {
    console.log('📝 Creando producto:', req.body);
    
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      sizes: req.body.sizes || [],
      colors: req.body.colors || [],
      image: req.body.image,
      stock: req.body.stock,
      description: req.body.description,
      featured: req.body.featured || false,
      active: req.body.active !== undefined ? req.body.active : true
    });

    const savedProduct = await product.save();
    
    console.log('✅ Producto creado:', savedProduct._id);
    
    res.status(201).json({
      success: true,
      product: savedProduct
    });
  } catch (error) {
    console.error('❌ Error creando producto:', error);
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
});

// ✅ NUEVO: Update product
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', async (req, res) => {
  try {
    console.log('📝 Actualizando producto:', req.params.id, req.body);
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ 
        success: false,
        error: 'Product not found' 
      });
    }

    console.log('✅ Producto actualizado:', product._id);
    
    res.json({
      success: true,
      product: product
    });
  } catch (error) {
    console.error('❌ Error actualizando producto:', error);
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
});

// ✅ NUEVO: Delete product (borrado lógico)
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    console.log('🗑️ Eliminando producto:', req.params.id);
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ 
        success: false,
        error: 'Product not found' 
      });
    }

    console.log('✅ Producto desactivado:', product._id);
    
    res.json({
      success: true,
      message: 'Product disabled successfully',
      product: product
    });
  } catch (error) {
    console.error('❌ Error eliminando producto:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// ✅ NUEVO: Delete product permanently
// @desc    Delete product permanently
// @route   DELETE /api/products/:id/permanent
// @access  Private/Admin
router.delete('/:id/permanent', async (req, res) => {
  try {
    console.log('💀 Eliminando producto permanentemente:', req.params.id);
    
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ 
        success: false,
        error: 'Product not found' 
      });
    }

    console.log('✅ Producto eliminado permanentemente');
    
    res.json({
      success: true,
      message: 'Product deleted permanently'
    });
  } catch (error) {
    console.error('❌ Error eliminando producto:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

module.exports = router;