import { Request, Response } from 'express';
import Restaurant from '../models/restaurant';

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json({
      data: restaurants,
      type: 'success',
    });
  } catch (error) {
    console.error('Error getting restaurants:', error);
    res.status(500).json({
      message: 'Error getting restaurants',
    });
  }
};

export const addRestaurant = async (req: Request, res: Response) => {
  try {
    console.log('req.body:', req.body);

    const { name, city, street, number, phone, openingHours } = req.body;
    const restaurant = new Restaurant({ name, city, street, number, phone, openingHours });

    await restaurant.save();

    res.status(201).json({
      data: restaurant._id,
      showToast: true,
      type: 'success',
      message: 'Restaurant added successfully',
    });
  } catch (error) {
    console.error('Error adding restaurant:', error);
    res.status(500).json({ message: 'Error adding restaurant' });
  }
};
export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error('Error getting restaurant:', error);
    res.status(500).json({ message: 'Error getting restaurant' });
  }
};
