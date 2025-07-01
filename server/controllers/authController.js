const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

// SIGNUP
exports.signup = async (req, res) => {
const { Fullname, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({
      Fullname,
      email,
      role,
      password: hashedPassword,
      kycVerified: false
    });

    await user.save();

  const token = jwt.sign(
  { id: user._id, email: user.email, role: user.role },  // ✅ include role
  JWT_SECRET,
  { expiresIn: '7d' }
);


    res.status(201).json({
      token,
      user: {
        id: user._id,
        Fullname: user.Fullname,
        email: user.email,
        Nationality: user.Nationality,
        kycVerified: user.kycVerified
      }
    });
  } catch (error) {
    console.error('Signup error:', error); // helps debug
    res.status(500).json({ message: 'Server error' });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
  { id: user._id, email: user.email, role: user.role },  // ✅ include role
  JWT_SECRET,
  { expiresIn: '7d' }
  
);


    res.json({
      token,
      user: {
        id: user._id,
        Fullname: user.Fullname,
        email: user.email,
        kycVerified: user.kycVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
