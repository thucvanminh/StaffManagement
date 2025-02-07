// backend/routes/testFuntion.js

// routes/testFunction.js
const express = require('express');
const router = express.Router();

// Add a test route
router.get('/', (req, res) => {
    const person = { name: "Alice", age: 25,gender: 'female' };
    const Alice =  { name: person.name, age: person['age'], gender: person.gender };

    res.status(200).json(Alice);
});

module.exports = router;