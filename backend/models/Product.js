const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['camisetas', 'pantalones', 'vestidos', 'sudaderas', 'faldas', 'chaquetas', 'blusas', 'shorts']
  },
  sizes: [{
    type: String,
    required: true
  }],
  colors: [{
    type: String,
    required: true
  }],
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  featured: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Solo crear índices si el modelo no existe
if (!mongoose.models.Product) {
  productSchema.index({ category: 1 });
  productSchema.index({ price: 1 });
  productSchema.index({ name: 'text', description: 'text' });
}

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);