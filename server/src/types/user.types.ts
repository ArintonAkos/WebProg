import { IRole } from '../models/role';
import { Types } from 'mongoose';
import { IPermission } from '../models/permission';
import { IPopulatedRole } from './role.types';
import { IRestaurant } from '../models/restaurant';

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  roles: Types.ObjectId[];
  adminRestaurants: Types.ObjectId[];
}

export interface IPopulatedUserDocument extends Omit<IUser, 'roles' | 'adminRestaurants'> {
  roles: IPopulatedRole[];
  adminRestaurants: IRestaurant[];
}

export interface IPopulatedUser {
  id: Types.ObjectId;
  name: string;
  email: string;
  roles: IRole[];
  permissions: IPermission[];
  adminRestaurants: IRestaurant[];
}
