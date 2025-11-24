const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/database');
require('dotenv').config();



// Conectar a la base de datos
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares - ORDEN CORRECTO
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());

// Importar rutas
const productRoutes = require('./routes/Products');
const authRoutes = require('./routes/auth');

// Usar rutas - UNA SOLA VEZ
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'ModaStyle API is running',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Manejo de rutas no encontradas
app.use( (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 ModaStyle API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🛒 Products endpoint: http://localhost:${PORT}/api/products`);
});

// Debug endpoint temporal
app.get('/api/debug/all-products', async (req, res) => {
  try {
    const Product = require('./models/Product');
    const allProducts = await Product.find({});
    
    console.log('🔍 DEBUG ALL - Total productos:', allProducts.length);
    
    res.json({
      success: true,
      total: allProducts.length,
      products: allProducts,
      rawResponse: allProducts
    });
  } catch (error) {
    console.error('DEBUG ALL Error:', error);
    res.status(500).json({ error: error.message });
  }
});