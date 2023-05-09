import { Request, Response } from 'express';
import RestaurantModel from '../models/restaurant';
import { validateOpeningHours } from '../services/restaurantService';
import uploadImages from '../middlewares/uploadImages';
import { deleteFiles } from '../utils/storage';

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await RestaurantModel.find();

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

    if (!validateOpeningHours(openingHours)) {
      res.status(401).json({
        showToast: true,
        message: 'Opening Hours format should be: H:M - H:M and the starting hour should be before the ending hour!',
      });
    }

    const restaurant = new RestaurantModel({ name, city, street, number, phone, openingHours });

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
    const restaurant = await RestaurantModel.findById(req.params.id);

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

      if (!validateOpeningHours(openingHours)) {
        deleteFiles(req.files, res.params.id);
        return res.status(400).json({
          showToast: true,
          type: 'warning',
          message: 'Opening Hours format should be: H:M - H:M and the starting hour should be before the ending hour!',
        });
      }

      try {
        const restaurant = await RestaurantModel.findById(req.params.id);

        if (!restaurant) {
          deleteFiles(req.files, res.params.id);
          return res.status(404).json({ message: 'Restaurant not found', showToast: true });
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

        const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(req.params.id, updatedRestaurantData, {
          new: true,
        });

        if (!updatedRestaurant) {
          deleteFiles(req.files, res.params.id);
          return res.status(404).json({ message: 'Restaurant not found', type: 'error' });
        }

        res.status(201).json({
          message: 'Restaurant successfully updated!',
          showToast: true,
          restaurant: updatedRestaurant,
          type: 'success',
        });
      } catch (err) {
        res.status(500).json({ message: 'Error updating restaurant', error: err, showToast: true, type: 'error' });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error processing request', error: err, showToast: true, type: 'error' });
  }
};

export const uploadRestaurantImages = async (req, res) => {
  try {
    uploadImages(req, res, async () => {
      try {
        const restaurant = await RestaurantModel.findById(req.params.id);

        if (!restaurant) {
          deleteFiles(req.files, res.params.id);
          return res.status(404).json({ message: 'Restaurant not found', showToast: true, type: 'warning' });
        }

        if (req.files && req.files.length > 0) {
          const uploadedImages = req.files.map((file) => file.path);
          restaurant.images.push(...uploadedImages);
        }

        const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(req.params.id, restaurant, {
          new: true,
        });

        if (!updatedRestaurant) {
          deleteFiles(req.files, res.params.id);
          return res.status(404).json({ message: 'Restaurant not found', type: 'warning', showToast: true });
        }

        res.status(201).json({
          message: 'Successfully uploaded images!',
          showToast: true,
          restaurant: updatedRestaurant,
          type: 'success',
        });
      } catch (err) {
        deleteFiles(req.files, res.params.id);
        res.status(500).json({ message: 'Error uploading images!', error: err, showToast: true, type: 'error' });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error processing request', error: err, type: 'error' });
  }
};
