import { NextFunction, Response } from 'express';
import Joi from '@hapi/joi';
import Request from '../types/request.types';

export const validationMiddleware = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message.replace(/['"]/g, ''),
    });
  }

  next();
};
