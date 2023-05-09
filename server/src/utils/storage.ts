import multer, { Multer } from 'multer';
import * as fs from 'fs';

const getFileName = (file: Multer.File, restaurantId: string) => {
  return `./images/${restaurantId}/${file.filename}`;
};

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const restaurantId = req.params.id;
    const dir = `./images/${restaurantId}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, getFileName(file, req.params.id));
  },
});

export const deleteFiles = (files: Multer.File[] | undefined, dir: string) => {
  if (!files) {
    return;
  }

  files.forEach((file) => {
    const filePath = getFileName(file, dir);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
};

export const upload = multer({ storage });
