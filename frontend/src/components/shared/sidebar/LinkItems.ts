import { IconType } from 'react-icons';
import { BiLogIn, BiPlus, BiRestaurant, BiUserPlus } from 'react-icons/all';

export interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
  requiredPermission?: string;
  group?: LinkItemGroup;
}

export type LinkItemGroup = 'default' | 'Restaurants';

export const LinkItems: Array<LinkItemProps> = [
  {
    name: 'Restaurants',
    icon: BiRestaurant,
    to: '/restaurants',
    requiredPermission: 'read Restaurant',
    group: 'Restaurants',
  },
];

export const UnAuthLinkItems: Array<LinkItemProps> = [
  { name: 'Login', icon: BiLogIn, to: '/auth/login' },
  { name: 'Registration', icon: BiUserPlus, to: '/auth/register' },
];

export const AuthLinkItems: Array<LinkItemProps> = [
  {
    name: 'Add Restaurant',
    icon: BiPlus,
    to: '/restaurant/add',
    requiredPermission: 'create Restaurant',
    group: 'Restaurants',
  },
  {
    name: 'Reservations',
    icon: BiRestaurant,
    to: '/reservations',
    requiredPermission: 'read Reservation',
    group: 'Restaurants',
  },
];
