const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createCar, getCars, getCar, updateCar, deleteCar } = require('../controllers/cars');

router.post('/', auth, createCar);
router.get('/', auth, getCars);
router.get('/:id', auth, getCar);
router.put('/:id', auth, updateCar);
router.delete('/:id', auth, deleteCar);

module.exports = router;