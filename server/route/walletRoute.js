const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const walletController = require('../controllers/walletController');

router.post('/load', authMiddleware, walletController.loadMoney);
router.post('/expense', authMiddleware, walletController.createExpense);
router.get('/balance', authMiddleware, walletController.getWalletBalance);
router.get('/transactions', authMiddleware, walletController.getTransactions);

module.exports = router;