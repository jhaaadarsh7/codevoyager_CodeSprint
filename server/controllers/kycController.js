const KYC = require('../models/kyc');
const User = require('../models/user');


exports.submitKYC = async (req, res) => {
  const userId = req.user.id;
  const {
    firstName, middleName, lastName, dateOfBirth, nationality,
    passportNumber, passportIssuePlace, passportIssueDate, passportExpiryDate,
    visaType, visaIssueDate, visaExpiryDate, expectedExitDate,
    sourceOfFunds, estimatedAmountToConvert, monthlyIncomeRange
  } = req.body;

  const files = req.files;

  try {
    if (
      !files.passportPhotoPage || !files.visaPage || !files.selfie || !files.proofOfAddress
    ) {
      return res.status(400).json({ message: 'All required documents must be uploaded' });
    }

    const docPaths = {
      passportPhotoPage: files.passportPhotoPage[0].path,
      visaPage: files.visaPage[0].path,
      selfie: files.selfie[0].path,
      proofOfAddress: files.proofOfAddress[0].path
    };

    let kyc = await KYC.findOne({ userId });

    if (kyc) {
      // Update existing
      Object.assign(kyc, {
        firstName, middleName, lastName, dateOfBirth, nationality,
        passportNumber, passportIssuePlace, passportIssueDate, passportExpiryDate,
        visaType, visaIssueDate, visaExpiryDate, expectedExitDate,
        sourceOfFunds, estimatedAmountToConvert, monthlyIncomeRange,
        ...docPaths,
        status: 'pending',
        submittedAt: new Date(),
        reviewedAt: null,
        reviewer: null
      });
    } else {
      kyc = new KYC({
        userId,
        firstName, middleName, lastName, dateOfBirth, nationality,
        passportNumber, passportIssuePlace, passportIssueDate, passportExpiryDate,
        visaType, visaIssueDate, visaExpiryDate, expectedExitDate,
        sourceOfFunds, estimatedAmountToConvert, monthlyIncomeRange,
        ...docPaths
      });
    }

    await kyc.save();
    await User.findByIdAndUpdate(userId, { kycVerified: false });

    res.status(200).json({ message: 'KYC submitted successfully', kyc });

  } catch (err) {
    console.error('KYC submission error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET my KYC info
exports.getMyKYC = async (req, res) => {
  const userId = req.user.id;
  try {
    const kyc = await KYC.findOne({ userId }).populate('reviewer', 'Fullname email');
    if (!kyc) return res.status(404).json({ message: 'No KYC record found' });

    res.json(kyc);
  } catch (err) {
    console.error('Get KYC error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ADMIN: VERIFY or REJECT
exports.verifyKYC = async (req, res) => {
  const kycId = req.params.id;
  const { status } = req.body;
  const reviewerId = req.user.id;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Status must be "approved" or "rejected"' });
  }

  try {
    const kyc = await KYC.findById(kycId);
    if (!kyc) return res.status(404).json({ message: 'KYC not found' });

    kyc.status = status;
    kyc.reviewedAt = new Date();
    kyc.reviewer = reviewerId;

    await kyc.save();

    // Also reflect in User model
    await User.findByIdAndUpdate(kyc.userId, { kycVerified: status === 'approved' });

    res.json({ message: `KYC ${status}`, kyc });

  } catch (err) {
    console.error('KYC verification error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};