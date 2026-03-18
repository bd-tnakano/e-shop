const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res, next) => {
  try {
    let products = await Product.find();

    if (products.length === 0) {
      // Pre-populate the database with sample data if it's empty
      const sampleProducts = [
        {
          name: 'Apple Juice',
          description: 'Freshly squeezed apple juice.',
          price: 2.99,
          image: 'apple_juice.jpg',
          stock: Math.floor(Math.random() * 41) + 10,
        },
        {
          name: 'Orange Juice',
          description: 'Freshly squeezed orange juice.',
          price: 2.99,
          image: 'orange_juice.jpg',
          stock: Math.floor(Math.random() * 41) + 10,
        },
        {
          name: 'Banana Juice',
          description: 'Freshly squeezed banana juice.',
          price: 3.99,
          image: 'banana_juice.jpg',
          stock: Math.floor(Math.random() * 41) + 10,
        },
        {
            name: 'Peach Juice',
            description: 'Freshly squeezed peach juice.',
            price: 4.99,
            image: 'peach_juice.jpg',
            stock: Math.floor(Math.random() * 41) + 10,
        },
        {
            name: 'Tomato Juice',
            description: 'Freshly squeezed tomato juice.',
            price: 3.49,
            image: 'tomato_juice.jpg',
            stock: Math.floor(Math.random() * 41) + 10,
        },
        {
            name: 'Carrot Juice',
            description: 'Freshly squeezed carrot juice.',
            price: 3.49,
            image: 'carrot_juice.jpg',
            stock: Math.floor(Math.random() * 41) + 10,
        },
      ];
      await Product.insertMany(sampleProducts);
      products = await Product.find();
    }

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
