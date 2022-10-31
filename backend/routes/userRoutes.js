const express = require('express');

// To use express router
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

// Now anytime we have a route that we want to protect, which simply add this 'protect' as a second argument
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
