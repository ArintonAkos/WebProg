import { Response } from 'express';
import Request from '../types/request.types';

const errorHandler = (err, req: Request, res: Response) => {
  res.status(500).json({ error: 'An error occurred', showToast: true });
};

export default errorHandler;
