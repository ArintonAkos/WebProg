import { Permission } from './permission';

export interface Role {
  name: string;
  permissions: Permission[];
}

export const AvailableRoles: Array<string> = ['User', 'Moderator', 'Admin'];
