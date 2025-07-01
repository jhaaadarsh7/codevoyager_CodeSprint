const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db')
require('dotenv').config();

const app = express();

connectDB();
 app.use(cors());
 app.use(express.json());

 app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Fintech backend is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});