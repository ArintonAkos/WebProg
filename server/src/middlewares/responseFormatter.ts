import { Response, NextFunction } from 'express';
import Request from '../types/request.types';

const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;

  res.json = function (data) {
    console.log(data);
    if (!data?.type) {
      if (Math.floor(res.statusCode / 100) === 2) {
        data.type = 'success';
      } else {
        data.type = 'error';
      }
    }

    console.log(data);
    return originalJson.call(this, data);
  };

  next();
};

export default responseFormatter;
