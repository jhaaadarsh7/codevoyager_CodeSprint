require('dotenv').config(); // TOP of file
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');

// Verify critical env vars
if (!process.env.JWT_SECRET) {
  console.error("FATAL: JWT_SECRET missing!");
  process.exit(1);
}

// Ensure uploads/ exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const authRoutes = require('./route/authRoutes');
const kycRoute = require('./route/kycRoute');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Optional static access

app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Fintech backend is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/kyc', kycRoute); // ✅ FIX this base path

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
