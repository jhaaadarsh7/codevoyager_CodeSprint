const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['load', 'expense'], required: true },
  amountForeign: Number,  // original currency amount
  currency: String,       // currency code like USD
  amountNPR: Number,      // converted amount in NPR after fee
  serviceFee: Number,     // fee deducted (4% of foreign amount converted to NPR)
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // For expense
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);