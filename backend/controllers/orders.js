const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  const { cart, total } = req.body;

  try {
    // Create order
    const order = await Order.create({
      user: req.user.id,
      products: cart.map(item => ({
        product: item._id,
        quantity: item.quantity,
      })),
      total,
    });

    // Update stock
    for (const item of cart) {
      const product = await Product.findById(item._id);
      product.stock -= item.quantity;
      await product.save();
    }

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: 'products.product',
      select: 'name price description category image',
    });

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
