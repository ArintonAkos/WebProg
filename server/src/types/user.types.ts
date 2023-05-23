import { IRole } from '../models/role';
import { Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  roles: Types.ObjectId[];
}

export interface IPopulatedUser {
  name: string;
  email: string;
  password: string;
  roles: IRole[];
}
