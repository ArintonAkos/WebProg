import { NextFunction, Response } from 'express';
import Request from '../types/request.types';

const cors = (req: Request, res: Response, next: NextFunction) => {
  console.log('Body 1: ', req.body);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');

  next();
};

export default cors;
