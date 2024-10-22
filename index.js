const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https');
require('dotenv').config();
const playerRoutes = require('./Routes/playerRoute');
const matchRoutes = require('./Routes/matchRoute');
const authRoutes = require('./Routes/authRoute')
const fs = require('fs');

const app = express();
const mongoUri = process.env.MONGODB_URI;
const PORT = 443;
// const PORT = 3000
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/players', playerRoutes);
app.use('/api/game', matchRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const options = {
  key: fs.readFileSync('/etc/nginx/ssl/nginx-selfsigned.key'),
  cert: fs.readFileSync('/etc/nginx/ssl/nginx-selfsigned.crt'),
};

https.createServer( app).listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on https://0.0.0.0:${PORT}`);
});