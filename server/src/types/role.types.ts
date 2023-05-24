import { IRole } from '../models/role';
import { IPermission } from '../models/permission';

export interface IPopulatedRole extends Omit<IRole, 'permissions'> {
  permissions: IPermission[];
}
