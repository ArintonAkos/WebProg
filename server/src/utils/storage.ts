import multer from 'multer';
import * as fs from 'fs';
import path from 'path';

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const restaurantId = req.params.id;
    const dir = `./images/${restaurantId}`;

    console.log(fs.existsSync(dir));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({ storage });
