import { NextFunction, Response } from 'express';
import Request from '../types/request.types';

const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;

  res.json = function (data) {
    if (!data?.type) {
      if (Math.floor(res.statusCode / 100) === 2) {
        data.type = 'success';
      } else {
        data.type = 'error';
      }
    }

    if (req.newTokens) {
      data.tokens = req.newTokens;
    }

    return originalJson.call(this, data);
  };

  try {
    return next();
  } catch (e) {
    console.error('Error occured: ', e);
  }
};

export default responseFormatter;
