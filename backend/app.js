const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Add the welcome route
app.get('/', (req, res) => {
  res.send('Welcome1 to the Recipe Sharing Platform!');
});

// Import routes
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
