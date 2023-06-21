import { NextFunction, Response } from 'express';
import Request from '../types/request.types';

const errorHandler = (err: any, req: Request, res: Response, _: NextFunction) => {
  res.status(500).json({ error: 'An error occurred', showToast: true });
};

export default errorHandler;
