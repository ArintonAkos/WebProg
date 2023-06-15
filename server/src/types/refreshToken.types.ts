import { Types } from 'mongoose';
import { IUser } from './user.types';

export interface IRefreshToken {
  user: Types.ObjectId;
  token: string;
}

export interface IPopulatedRefreshToken {
  user: IUser;
  token: string;
}
