const express = require('express');
const { getJobs, createJob } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getJobs);
router.post('/', protect, authorize('recruiter'), createJob);

module.exports = router;
