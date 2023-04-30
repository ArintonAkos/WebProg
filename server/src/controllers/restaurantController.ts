import { Request, Response } from 'express';
import Restaurant from '../models/restaurant';
import { uploadImages } from '../index';

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

export const editRestaurant = async (req, res) => {
  try {
    uploadImages(req, res, async () => {
      const { name, city, street, number, phone, openingHours } = req.body;

      try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
          return res.status(404).json({ message: 'Restaurant not found' });
        }

        const updatedRestaurantData = {
          name,
          city,
          street,
          number,
          phone,
          openingHours,
          images: [...restaurant.images],
        };

        if (req.files && req.files.length > 0) {
          const uploadedImages = req.files.map((file) => file.path);
          updatedRestaurantData.images.push(...uploadedImages);
        }

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, updatedRestaurantData, {
          new: true,
        });

        if (!updatedRestaurant) {
          return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.json(updatedRestaurant);
      } catch (err) {
        res.status(500).json({ message: 'Error updating restaurant', error: err });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error processing request', error: err });
  }
};
