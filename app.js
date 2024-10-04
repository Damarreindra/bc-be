const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const playerRoutes = require('./Routes/playerRoute');
const matchRoutes = require('./Routes/matchRoute');

const app = express();
const mongoUri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/players', playerRoutes);
app.use('/api/game', matchRoutes);

// Start server
app.listen(() => {
  console.log('Server is running');
});

module.exports = app;