const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const kycController = require('../controllers/kycController');
const upload = require('../utils/multerConfig');

// Upload fields
const uploadFields = upload.fields([
  { name: 'passportPhotoPage', maxCount: 1 },
  { name: 'visaPage', maxCount: 1 },
  { name: 'selfie', maxCount: 1 },
  { name: 'proofOfAddress', maxCount: 1 }
]);

router.post('/submit', authMiddleware, uploadFields, kycController.submitKYC);
router.get('/me', authMiddleware, kycController.getMyKYC);
router.patch('/verify/:id', authMiddleware, isAdmin, kycController.verifyKYC);

module.exports = router;
