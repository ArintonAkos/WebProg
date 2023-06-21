import multer from 'multer';
import * as fs from 'fs';
import path from 'path';
import { BaseRestaurantRequest } from '../requests/restaurantRequestTypes';
import { Express } from 'express';

export function generateFields<T extends BaseRestaurantRequest>(sampleObject: T): multer.Field[] {
  const fields: multer.Field[] = [];

  for (const key in sampleObject.body) {
    fields.push({ name: key, maxCount: 1 });
  }

  console.log(fields, sampleObject.body);
  return fields;
}

const getFileName = (file: Express.Multer.File, restaurantId: string) => `/images/${restaurantId}/${file.originalname}`;

export const deleteFiles = (files: Express.Multer.File[] | undefined, dir: string) => {
  if (!files) {
    return;
  }

  files.forEach((file) => {
    if (!file) {
      return;
    }

    const filePath = getFileName(file, dir);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
};

export const deleteFilesById = (files: string[], dir: string) => {
  if (!files) {
    return;
  }

  files.forEach((file) => {
    if (!file) {
      return;
    }

    const filePath = `/images/${dir}/${file}`;

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
};

export const uploadRestaurantImagesMulter = <T extends BaseRestaurantRequest>(restaurantId: string, req: T) => {
  const dir = `/images/${restaurantId}`;
  console.log(dir, req.files);

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

  return multer({ storage }).fields(generateFields(req));
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
