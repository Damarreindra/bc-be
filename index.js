const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import the cors middleware
require('dotenv').config();
const playerRoutes = require('./Routes/playerRoute');
const matchRoutes = require('./Routes/matchRoute');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ['exp://192.168.100.5:8081', 'http://localhost:3000', 'http://192.168.x.x:3000','exp://192.168.x.x:19000'],
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
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
