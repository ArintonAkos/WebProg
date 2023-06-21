import { deleteFiles, uploadRestaurantImagesMulter } from '../utils/storage';
import Restaurant from '../models/restaurant';
import { NextFunction, Response } from 'express';
import { BaseRestaurantRequest } from '../requests/restaurantRequestTypes';

export default async <T extends BaseRestaurantRequest>(req: T, res: Response, next: NextFunction) => {
  const upload = uploadRestaurantImagesMulter(req.params.id, req);

  if (!req.params.id) {
    return res.status(400).json({
      message: 'Restaurant id is required!',
    });
  }

  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return res.status(404).json({
      message: 'Restaurant not found!',
    });
  }

  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      deleteFiles(req.images, req.params.id);

      return res.status(500).json({
        message: 'Error uploading images!',
      });
    }

    next();
  });
};
