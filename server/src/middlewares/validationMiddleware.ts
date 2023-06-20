import { NextFunction, Response } from 'express';
import Joi from '@hapi/joi';
import Request from '../types/request.types';

export const validationMiddleware = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body, req);
    const { error } = schema.validate(req.body);
    console.log(error);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message.replace(/['"]/g, ''),
      });
    }

    next();
  };
};
