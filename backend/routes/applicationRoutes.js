const express = require('express');
const multer = require('multer');
const { submitApplication, getApplications, analyzeResumeUpload } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

const router = express.Router();

router.get('/', protect, getApplications);
router.post('/', protect, submitApplication);
router.post('/resume-analysis', protect, upload.single('resume'), analyzeResumeUpload);

module.exports = router;
