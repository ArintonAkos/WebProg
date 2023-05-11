import { deleteFiles, uploadRestaurantImagesMulter } from '../utils/storage';
import Restaurant from '../models/restaurant';

export default async (req, res, next) => {
  console.log('Parameters: ', req.params);
  const upload = uploadRestaurantImagesMulter(req.params.id);

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
      deleteFiles(req.files, res.params.id);
      return res.status(500).json({
        message: 'Error uploading images!',
      });
    } else {
      next();
    }
  });
};
