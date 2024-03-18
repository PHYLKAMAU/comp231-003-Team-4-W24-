const express = require('express');
const Menu = express.Router();

let menuData = [];

Menu.get('/', (req, res) => {
  res.json(menuData);
});

Menu.post('/', async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ message: 'Please enter all fields.' });
  }

  const newMenu = {
    id: menuData.length + 1,
    name,
    description,
    price,
  };

  try {
    // Simulate a server error for demonstration
    if (Math.random() < 0.5) {
      throw new Error('Internal server error');
    }

    // Simulate a delay to mimic server response time
    await new Promise(resolve => setTimeout(resolve, 2000));

    menuData.push(newMenu);
    res.status(201).json(newMenu);
  } catch (error) {
    console.error('Error adding menu:', error);
    res.status(500).json({ message: 'An error occurred while adding the menu. Please try again later.' });
  }
});

module.exports = Menu;
