import multer, { Multer } from 'multer';
import * as fs from 'fs';

const getFileName = (file: Multer.File, restaurantId: string) => {
  return `/images/${restaurantId}/${file.originalname}`;
};

export const deleteFiles = (files: Multer.File[] | undefined, dir: string) => {
  if (!files) {
    return;
  }

  files.forEach((file) => {
    console.log('File: ', file);
    const filePath = getFileName(file, dir);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
};

export const uploadRestaurantImagesMulter = (restaurantId: string) => {
  const dir = `/images/${restaurantId}`;

  console.log(dir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  return multer({ storage }).array('images');
};
