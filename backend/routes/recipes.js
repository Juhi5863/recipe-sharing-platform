const express = require('express');
const fs = require('fs');

const router = express.Router();
const recipesFilePath = './data/recipes.json';

// Read and write JSON utility functions
const readJSONFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJSONFile = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Get all recipes
router.get('/', (req, res) => {
  const recipes = readJSONFile(recipesFilePath);
  res.json(recipes);
});

// Add a new recipe
router.post('/', (req, res) => {
  const { title, ingredients, steps } = req.body;
  const recipes = readJSONFile(recipesFilePath);

  const newRecipe = { id: Date.now(), title, ingredients, steps };
  recipes.push(newRecipe);
  writeJSONFile(recipesFilePath, recipes);

  res.status(201).json(newRecipe);
});

module.exports = router;
