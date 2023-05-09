import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, _: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'An error occurred', showToast: true });
};

export default errorHandler;
