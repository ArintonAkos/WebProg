import Seeder from './Seeder';
import RestaurantModel, { Restaurant } from '../../models/restaurant';

const restaurantSeeds: Restaurant[] = [
  {
    name: 'Nagy Étterem',
    phone: '06 1 123 4567',
    openingHours: '10:00 - 22:00',
    city: 'Budapest',
    street: 'Király utca',
    number: '100',
  },
  {
    name: 'Tóth Vendéglő',
    phone: '06 1 234 5678',
    openingHours: '11:00 - 23:00',
    city: 'Budapest',
    street: 'Rákóczi út',
    number: '101',
  },
  {
    name: 'Szabó Pizzéria',
    phone: '06 1 345 6789',
    openingHours: '10:00 - 24:00',
    city: 'Budapest',
    street: 'Andrássy út',
    number: '102',
  },
  {
    name: 'Kovács Bistro',
    phone: '06 1 456 7890',
    openingHours: '09:00 - 21:00',
    city: 'Budapest',
    street: 'Váci utca',
    number: '103',
  },
  {
    name: 'Horváth Kávézó',
    phone: '06 1 567 8901',
    openingHours: '08:00 - 20:00',
    city: 'Budapest',
    street: 'Dózsa György út',
    number: '104',
  },
];

export default new Seeder<Restaurant>(RestaurantModel, restaurantSeeds);
