'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getRestaurantById = exports.addRestaurant = exports.getRestaurants = void 0;
const restaurant_1 = __importDefault(require('../models/restaurant'));
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurant_1.default.find();
    return res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error getting restaurants:', error);
    return res.status(500).json({ message: 'Error getting restaurants' });
  }
};
exports.getRestaurants = getRestaurants;
const addRestaurant = async (req, res) => {
  try {
    const { name, address, phone, openingHours } = req.body;
    const restaurant = new restaurant_1.default({ name, address, phone, openingHours });
    await restaurant.save();
    return res.status(200).json({ message: 'Restaurant added successfully' });
  } catch (error) {
    console.error('Error adding restaurant:', error);
    return res.status(500).json({ message: 'Error adding restaurant' });
  }
};
exports.addRestaurant = addRestaurant;
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await restaurant_1.default.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error('Error getting restaurant:', error);
    res.status(500).json({ message: 'Error getting restaurant' });
  }
};
exports.getRestaurantById = getRestaurantById;
