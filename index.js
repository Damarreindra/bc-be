const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const playerRoutes = require('./Routes/playerRoute');
const matchRoutes = require('./Routes/matchRoute');

const app = express();
const mongoUri = process.env.MONGODB_URI;
const PORT = process.env.PORT

// Connect to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
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

// Listen on specified port
app.listen(PORT, () => {
  console.log(`Server is running on port http://127.0.0.1:${PORT}`);
});

module.exports = app;
