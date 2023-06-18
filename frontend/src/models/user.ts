import { Role } from './role';
import { Permission } from './permission';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  roles: Role[];
  permissions: Permission[];
  approved: boolean;
}

export default User;
