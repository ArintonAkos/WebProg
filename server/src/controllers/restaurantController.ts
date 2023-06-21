import { Response } from 'express';
import Restaurant from '../models/restaurant';
import { validateOpeningHours } from '../services/restaurantService';
import { deleteFile, deleteFiles, deleteFilesById } from '../utils/storage';
import Request from '../types/request.types';
import { AddRestaurantRequest, EditRestaurantRequest } from '../requests/restaurantRequestTypes';
import { createTables, deleteTable } from '../services/tableService';
import MongoErrorCodes from '../database/MongoErrorCodes';

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find({}, '_id name city images openingHours');

    return res.status(200).json({
      data: restaurants,
      type: 'success',
    });
  } catch (error) {
    if (error.code === MongoErrorCodes.DUPLICATE_KEY || error.code === MongoErrorCodes.DUPLICATE_KEY_UPDATE) {
      const field = error.message.split('index:')[1].split('dup key')[0].split('$')[1];

      return res.status(400).json({
        message: `There's already a table with the same ${field} in the restaurant.`,
        showToast: true,
        type: 'error',
      });
    } else {
      console.error('Error getting restaurants:', error);
      return res.status(500).json({
        message: 'Error getting restaurants',
      });
    }
  }
};

export const addRestaurant = async (req: AddRestaurantRequest, res: Response) => {
  try {
    const { name, city, street, number, phone, openingHours, tables } = req.body;

    if (!validateOpeningHours(openingHours)) {
      return res.status(401).json({
        showToast: true,
        message: 'Opening Hours format should be: H:M - H:M and the starting hour should be before the ending hour!',
      });
    }

    const restaurant = new Restaurant({ name, city, street, number, phone, openingHours });
    await restaurant.save();

    restaurant.tables = await createTables(restaurant._id, tables);
    await restaurant.save();

    return res.status(201).json({
      data: restaurant._id,
      showToast: true,
      type: 'success',
      message: 'Restaurant added successfully',
    });
  } catch (error) {
    if (error.code === MongoErrorCodes.DUPLICATE_KEY || error.code === MongoErrorCodes.DUPLICATE_KEY_UPDATE) {
      const field = error.message.split('index:')[1].split('dup key')[0].split('$')[1];

      return res.status(400).json({
        message: `There's already a table with the same ${field} in the restaurant.`,
        showToast: true,
        type: 'error',
      });
    } else {
      console.error('Error adding restaurant:', error);
      return res.status(500).json({ message: 'Error adding restaurant' });
    }
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('tables', '_id number seats').exec();

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    return res.status(200).json(restaurant);
  } catch (error) {
    console.error('Error getting restaurant:', error);
    return res.status(500).json({ message: 'Error getting restaurant' });
  }
};

export const editRestaurant = async (req: EditRestaurantRequest, res: Response) => {
  const { name, city, street, number, phone, openingHours, tables, deletedImages } = req.body;

  const trimmedOpeningHours = openingHours.trim();
  if (!validateOpeningHours(trimmedOpeningHours)) {
    return res.status(400).json({
      showToast: true,
      type: 'warning',
      message: 'Opening Hours format should be: H:M - H:M and the starting hour should be before the ending hour!',
    });
  }

  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId).populate('tables').exec();

    if (!restaurant) {
      deleteFiles(req.files, req.params.id);
      return res.status(404).json({ message: 'Restaurant not found', showToast: true });
    }
    deleteFilesById(deletedImages, req.params.id);

    for (const table of restaurant.tables) {
      await deleteTable(table);
    }

    const updatedRestaurantData = {
      name,
      city,
      street,
      number,
      phone,
      openingHours: trimmedOpeningHours,
      images: [...restaurant.images],
      tables: await createTables(restaurant._id, tables),
    };

    if (deletedImages && deletedImages.length > 0) {
      updatedRestaurantData.images = updatedRestaurantData.images.filter((image) => !deletedImages.includes(image));
      deletedImages.forEach((image) => deleteFile(`${restaurantId}${image}`));
    }

    if (req.files) {
      if (Array.isArray(req.files)) {
        const uploadedImages = req.files.map((file) => file.path);
        updatedRestaurantData.images.push(...uploadedImages);
      } else {
        Object.values(req.files).forEach((filesArray) => {
          const uploadedImages = filesArray.map((file) => file.path);
          updatedRestaurantData.images.push(...uploadedImages);
        });
      }
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, updatedRestaurantData, {
      new: true,
    });

    if (!updatedRestaurant) {
      deleteFiles(req.files, req.params.id);
      return res.status(404).json({ message: 'Restaurant not found', type: 'error' });
    }

    return res.status(201).json({
      message: 'Restaurant successfully updated!',
      showToast: true,
      restaurant: updatedRestaurant,
      type: 'success',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error updating restaurant', error: err, showToast: true, type: 'error' });
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

    return res.status(201).json({
      message: 'Successfully uploaded images!',
      showToast: true,
      restaurant: updatedRestaurant,
      type: 'success',
    });
  } catch (err) {
    deleteFiles(req.files, res.params.id);
    return res.status(500).json({ message: 'Error uploading images!', error: err, showToast: true, type: 'error' });
  }
};
