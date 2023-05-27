import { Permission } from '../models/permission';

export const guestPermissions: Permission[] = [
  {
    name: 'read all',
    action: 'read',
    subject: 'all',
    description: 'read permission for all',
  },
];
