const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const router = express.Router();
const usersFilePath = './data/users.json';

// Read and write JSON utility functions
const readJSONFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJSONFile = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const users = readJSONFile(usersFilePath);

  if (users.find(user => user.username === username)) {
    return res.status(400).send('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  writeJSONFile(usersFilePath, users);

  res.status(201).send('User created');
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = readJSONFile(usersFilePath);
  const user = users.find(user => user.username === username);

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

module.exports = router;
