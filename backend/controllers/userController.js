const asyncHandler = require('express-async-handler');

// Bring bcrypt because we want to hash the password, we can't put a plain text password in the database
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

// @desc    Register a new user
// @route   /api/users
// @access  Public (meaning that do we need to authenticate, do we need to send a token to access this route)
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    // 400 is the client error
    // We can do this way of handing the errors for everything but it has a better pattern
    // return res.status(400).json({ message: 'Please include all fields' });

    // This is the better way of handling the errors
    res.status(400);
    // If only this line, you will get the 'standard express error handler', which is an HTML page/file with your text, which we don't want that we want to send the a JSON object (now we will get the JSON at client)
    throw new Error('Please include all fields');
  }

  // Find if user already exists
  // On the User model, we have .findOne method
  // const userExists = await User.findOne({ email: email });
  const userExists = await User.findOne({ email });

  if (userExists) {
    // Client error
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user, the rest of fields will be default by model
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      // _id because this is how mongoDb stores their ID
      _id: user._id,
      name: user.name,
      email: user.email,
      // We need to sign the token, the token needs to have userID inside of it, this is the main reason for the token.
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    // It is 200 because we didn't create anything
    res.status(200);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    // It is 401 because it is Unautherised right
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  // Now we have access to the req.user.id, which id comes from the token
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// Generate token
const generateToken = id => {
  // jwt has the sign() method, and what we want to put in this token is the id of user and JWT secret.
  // The 3rd object is the optional
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = { registerUser, loginUser, getMe };
