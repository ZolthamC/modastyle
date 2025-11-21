const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/database');
require('dotenv').config();

// Conectar a la base de datos
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Importar rutas
const productRoutes = require('./routes/products');

// Usar rutas
app.use('/api/products', productRoutes);

// Ruta de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'ModaStyle API is running',
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Ruta 404 (manejo de rutas no encontradas)
// Evitar pasar '*' directamente a app.use() porque algunas versiones de path-to-regexp
// lanzan errores al parsearlo. Usamos un middleware sin path para capturar rutas
// que no coinciden con ninguna ruta anterior.
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 ModaStyle API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});