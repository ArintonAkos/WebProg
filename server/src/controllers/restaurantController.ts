import { Response } from 'express';
import Restaurant from '../models/restaurant';
import { validateOpeningHours } from '../services/restaurantService';
import { deleteFiles } from '../utils/storage';
import Request from '../types/request.types';
import { AddRestaurantRequest, EditRestaurantRequest } from '../requests/restaurantRequestTypes';
import { createTables } from '../services/tableService';

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find({}, '_id name city images openingHours');

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

export const addRestaurant = async (req: AddRestaurantRequest, res: Response) => {
  try {
    const { name, city, street, number, phone, openingHours, tables } = req.body;

    if (!validateOpeningHours(openingHours)) {
      res.status(401).json({
        showToast: true,
        message: 'Opening Hours format should be: H:M - H:M and the starting hour should be before the ending hour!',
      });
    }

    const restaurant = new Restaurant({ name, city, street, number, phone, openingHours });
    await restaurant.save();

    restaurant.tables = await createTables(restaurant._id, tables);
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
    const restaurant = await Restaurant.findById(req.params.id).populate('tables', '_id number seats').exec();

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

export const editRestaurant = async (req: EditRestaurantRequest, res: Response) => {
  const { name, city, street, number, phone, openingHours } = req.body;

  if (!validateOpeningHours(openingHours)) {
    deleteFiles(req.files, req.params.id);

    return res.status(400).json({
      showToast: true,
      type: 'warning',
      message: 'Opening Hours format should be: H:M - H:M and the starting hour should be before the ending hour!',
    });
  }

  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      deleteFiles(req.files, req.params.id);
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

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, updatedRestaurantData, {
      new: true,
    });

    if (!updatedRestaurant) {
      deleteFiles(req.files, req.params.id);
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
};

export const uploadRestaurantImages = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      deleteFiles(req.files, res.params.id);
      return res.status(404).json({ message: 'Restaurant not found', showToast: true, type: 'warning' });
    }

    if (req.files && req.files.length > 0) {
      const uploadedImages = req.files.map((file) => file.path);
      restaurant.images.push(...uploadedImages);
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, restaurant, {
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
};
