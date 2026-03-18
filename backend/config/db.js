const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // TODO: Move this to a .env file
    const mongoURI = 'mongodb://localhost:27017/e-shop';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
