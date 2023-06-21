import { Response } from 'express';
import User from '../models/user';
import Request from '../types/request.types';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching users', error });
  }
};
