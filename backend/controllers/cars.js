const Car = require('../models/Car');
const mongoose = require('mongoose');

exports.createCar = async (req, res) => {
  try {
    const newCar = new Car({
      ...req.body,
      user: req.user.id
    });
    const car = await newCar.save();
    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id });
    res.json(cars);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }
    if (car.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateCar = async (req, res) => {
  try {
    let car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }
    if (car.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    car = await Car.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteCar = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid car ID' });
    }
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }
    if (car.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await Car.findByIdAndDelete({ _id: req.params.id })
    res.json({ msg: 'Car removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};