const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Create user
// @route   POST /api/users
// @access  Public
exports.createUser = async (req, res, next) => {
  try {
    // SENSITIVE DATA EXPOSURE (Vulnerability)
    console.log('Registering user with password:', req.body.password);

    const { username, firstName, lastName, email, password, address } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address,
    });

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res, next) => {
  try {
    const { password } = req.body; // Remove username destructuring

    // NOSQL INJECTION (Vulnerability) - passing req.body.username directly
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};


// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Public
exports.updateUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }

    // Require user to update their own profile (Fixes IDOR)
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ success: false, error: 'Not authorized to update this user' });
    }

    // Explicitly whitelist fields (Fixes Mass Assignment)
    const allowedFields = ['username', 'firstName', 'lastName', 'email', 'password', 'address'];
    const updateData = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
