import { IconType } from 'react-icons';
import { BiLogIn, BiPlus, BiRestaurant, BiUserPlus } from 'react-icons/all';

export interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}

export const LinkItems: Array<LinkItemProps> = [
  { name: 'Restaurants', icon: BiRestaurant, to: '/restaurants' },
  { name: 'Add Restaurant', icon: BiPlus, to: '/restaurant/add' },
  { name: 'Registration', icon: BiUserPlus, to: '/auth/register' },
  { name: 'Login', icon: BiLogIn, to: '/auth/login' },
];
