import multer, { Multer } from 'multer';
import * as fs from 'fs';
import path from 'path';

const getFileName = (file: Multer.File, restaurantId: string) => {
  return `/images/${restaurantId}/${file.originalname}`;
};

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

export const uploadRestaurantImagesMulter = (restaurantId: string) => {
  const dir = `/images/${restaurantId}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  return multer({ storage }).array('images');
};

/**
 * Deletes a file.
 * @param filePath - The path of the file to delete.
 */
export const deleteFile = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  } else {
    console.error(`File not found: ${filePath}`);
  }
};

/**
 * Deletes all files in a directory.
 * @param dirPath - The path of the directory.
 */
export const deleteFilesInDirectory = (dirPath: string) => {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      deleteFile(filePath);
    }
  } else {
    console.error(`Directory not found: ${dirPath}`);
  }
};
