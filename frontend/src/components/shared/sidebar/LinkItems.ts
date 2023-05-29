import { IconType } from 'react-icons';
import { BiCustomize, BiLogIn, BiLogOut, BiPlus, BiRestaurant, BiTable, BiUserPlus } from 'react-icons/all';

export interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
  requiredPermission?: string;
  subItems?: Array<LinkItemProps>;
  authRequired?: boolean;
}

export interface Group {
  name: LinkItemGroup;
  items: LinkItemProps[];
  authRequired?: boolean;
}

export type LinkItemGroup = 'default' | 'Restaurants' | 'Reservations' | 'Profile' | 'User';

export const LinkItems: Array<Group> = [
  {
    name: 'Restaurants',
    items: [
      {
        name: 'Restaurants',
        icon: BiRestaurant,
        to: '/',
        requiredPermission: 'read Restaurant',
      },
      {
        name: 'Add Restaurant',
        icon: BiPlus,
        to: '/restaurant/add',
        requiredPermission: 'create Restaurant',
        authRequired: true,
      },
    ],
  },
  {
    name: 'Reservations',
    items: [
      {
        name: 'Reservations',
        icon: BiTable,
        to: '/reservations',
        requiredPermission: 'read Reservation',
        authRequired: true,
      },
      {
        name: 'Manage Reservations',
        icon: BiCustomize,
        to: '/reservations/manage',
        requiredPermission: 'update Reservation',
        authRequired: true,
      },
    ],
  },
  {
    name: 'Profile',
    authRequired: true,
    items: [{ name: 'Logout', icon: BiLogOut, to: '/auth/logout', authRequired: true }],
  },
  {
    name: 'User',
    items: [
      { name: 'Login', icon: BiLogIn, to: '/auth/login', authRequired: false },
      { name: 'Registration', icon: BiUserPlus, to: '/auth/register', authRequired: false },
    ],
  },
];
