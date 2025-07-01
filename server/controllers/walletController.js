const Wallet = require('../models/walletModel');
const Transaction = require('../models/transactionModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/user');

// Dummy conversion function for USD to NPR (replace with real exchange API)
const convertToNPR = (amountUSD) => amountUSD * 130;
const SERVICE_FEE_PERCENT = 2; // 

// Load Money Controller
exports.loadMoney = async (req, res) => {
  const userId = req.user.id;
  const { amountForeign, currency, paymentMethodId } = req.body;

  try {
    if (!amountForeign || !currency || !paymentMethodId) {
      return res.status(400).json({ message: 'Required fields missing: amount, currency, or payment method' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.kycVerified) return res.status(403).json({ message: 'KYC not verified. Complete KYC to load money.' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amountForeign * 100),
      currency,
      payment_method: paymentMethodId,
      confirm: true,
      receipt_email: user.email,
      description: `Load wallet for user ${userId}`,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never' // Prevents redirect-required methods
      }
    });

    const amountNPR = convertToNPR(amountForeign);
    const serviceFee = (SERVICE_FEE_PERCENT / 100) * amountNPR;
    const finalAmountNPR = amountNPR - serviceFee;

    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = new Wallet({ userId, balanceNPR: finalAmountNPR });
    } else {
      wallet.balanceNPR += finalAmountNPR;
    }
    await wallet.save();

    const transaction = new Transaction({
      userId,
      type: 'load',
      amountForeign,
      currency,
      amountNPR: finalAmountNPR,
      serviceFee
    });
    await transaction.save();

    res.status(200).json({
      message: 'Money loaded successfully',
      balanceNPR: wallet.balanceNPR,
      transactionId: transaction._id
    });

  } catch (err) {
    console.error('Load money error:', err.message || err);
    res.status(500).json({ message: 'Failed to load money', error: err.message });
  }
};

// Create Expense Controller
exports.createExpense = async (req, res) => {
  const userId = req.user.id;
  const { amountNPR, vendorId } = req.body;

  try {
    if (!amountNPR || !vendorId) {
      return res.status(400).json({ message: 'amountNPR and vendorId are required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.kycVerified) return res.status(403).json({ message: 'KYC not verified. Complete KYC to create expense.' });

    const wallet = await Wallet.findOne({ userId });
    if (!wallet || wallet.balanceNPR < amountNPR) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    wallet.balanceNPR -= amountNPR;
    await wallet.save();

    // ❗TODO: Bank API Integration (Nepal) to transfer funds to vendor

    const transaction = new Transaction({
      userId,
      type: 'expense',
      amountNPR,
      vendorId
    });
    await transaction.save();

    res.status(200).json({
      message: 'Expense created and vendor paid',
      balanceNPR: wallet.balanceNPR,
      transactionId: transaction._id
    });

  } catch (err) {
    console.error('Expense error:', err.message || err);
    res.status(500).json({ message: 'Failed to create expense', error: err.message });
  }
};

// Get Wallet Balance
exports.getWalletBalance = async (req, res) => {
  const userId = req.user.id;
  try {
    const wallet = await Wallet.findOne({ userId });
    res.json({ balanceNPR: wallet ? wallet.balanceNPR : 0 });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get wallet balance', error: err.message });
  }
};

// Get All Transactions
exports.getTransactions = async (req, res) => {
  const userId = req.user.id;
  try {
    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transactions', error: err.message });
  }
};