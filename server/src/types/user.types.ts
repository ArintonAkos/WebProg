import { Types } from 'mongoose';
import { IRole } from '../models/role';
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
  approved: boolean;
}

export interface IPopulatedUserDocument extends Omit<IUser, 'roles' | 'adminRestaurants'> {
  roles: IPopulatedRole[];
  adminRestaurants: IRestaurant[];
}

export interface IPopulatedUser {
  id: Types.ObjectId;
  name: string;
  email: string;
  phone: string | undefined;
  roles: IRole[];
  permissions: IPermission[];
  adminRestaurants: IRestaurant[];
  approved: boolean;
}
