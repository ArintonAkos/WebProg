import { IRole } from '../models/role';
import { Types } from 'mongoose';
import { IPermission } from '../models/permission';
import { IPopulatedRole } from './role.types';

export interface IUser {
  name: string;
  email: string;
  password: string;
  roles: Types.ObjectId[];
}

export interface IPopulatedUserDocument extends Omit<IUser, 'roles'> {
  roles: IPopulatedRole[];
}

export interface IPopulatedUser {
  name: string;
  email: string;
  roles: IRole[];
  permissions: IPermission[];
}
