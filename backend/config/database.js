const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Verificar si ya está conectado
    if (mongoose.connection.readyState === 1) {
      console.log('🗄️ MongoDB already connected');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/modastyle', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`🗄️ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;