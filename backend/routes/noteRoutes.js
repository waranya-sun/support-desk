const express = require('express');

// We need {mergeParams: true}, in order to get the '/api/tickets' endpoint
// /api/tickets/:ticketId/notes
const router = express.Router({ mergeParams: true });
const { getNotes, addNotes } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getNotes).post(protect, addNotes);

module.exports = router;
