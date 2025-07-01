const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  // Personal Info
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  nationality: { type: String, required: true },

  // Passport
  passportNumber: { type: String, required: true },
  passportIssuePlace: { type: String, required: true },
  passportIssueDate: { type: Date, required: true },
  passportExpiryDate: { type: Date, required: true },

  // Visa Info
  visaType: { type: String, required: true },
  visaIssueDate: { type: Date, required: true },
  visaExpiryDate: { type: Date, required: true },
  expectedExitDate: { type: Date, required: true },

  sourceOfFunds: { type: String, required: true },
  estimatedAmountToConvert: { type: Number, required: true },
  monthlyIncomeRange: { type: String, required: true }, // like: 'Below $1000', '$1000-$3000', etc.

  passportPhotoPage: { type: String, required: true },
  visaPage: { type: String, required: true },
  selfie: { type: String, required: true },
  proofOfAddress: { type: String, required: true },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: { type: Date, default: Date.now },
  reviewedAt: Date,
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('KYC', kycSchema);
