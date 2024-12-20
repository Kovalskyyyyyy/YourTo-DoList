const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');
const itemRoutes = require('./routes/itemRoutes');
const memberRoutes = require('./routes/memberRoutes');

app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/members', memberRoutes);

// Root route for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

module.exports = app;