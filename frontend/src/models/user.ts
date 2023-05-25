import { Role } from './role';
import { Permission } from './permission';

interface User {
  name: string;
  email: string;
  _id: string;
  roles: Role[];
  permissions: Permission[];
}

export default User;
