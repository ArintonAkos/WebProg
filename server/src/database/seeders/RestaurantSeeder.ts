import Seeder from './Seeder';
import Restaurant, { IRestaurant } from '../../models/restaurant';
import Table from '../../models/table';
import { Types } from 'mongoose';

const restaurantSeeds: IRestaurant[] = [
  {
    name: 'Nagy Étterem',
    phone: '06 1 123 4567',
    openingHours: '10:00 - 22:00',
    city: 'Budapest',
    street: 'Király utca',
    number: '100',
    tables: [],
  },
  {
    name: 'Tóth Vendéglő',
    phone: '06 1 234 5678',
    openingHours: '11:00 - 23:00',
    city: 'Budapest',
    street: 'Rákóczi út',
    number: '101',
    tables: [],
  },
  {
    name: 'Szabó Pizzéria',
    phone: '06 1 345 6789',
    openingHours: '10:00 - 24:00',
    city: 'Budapest',
    street: 'Andrássy út',
    number: '102',
    tables: [],
  },
  {
    name: 'Kovács Bistro',
    phone: '06 1 456 7890',
    openingHours: '09:00 - 21:00',
    city: 'Budapest',
    street: 'Váci utca',
    number: '103',
    tables: [],
  },
  {
    name: 'Horváth Kávézó',
    phone: '06 1 567 8901',
    openingHours: '08:00 - 20:00',
    city: 'Budapest',
    street: 'Dózsa György út',
    number: '104',
    tables: [],
  },
];

const createRandomTableForRestaurant = async (restaurantId: Types.ObjectId): Promise<Types.ObjectId[]> => {
  const tables: Types.ObjectId[] = [];

  const tableCount = Math.floor(Math.random() * 10) + 1;
  for (let i = 0; i < tableCount; i++) {
    const table = await Table.create({
      seats: Math.floor(Math.random() * 10) + 1,
      number: i + 1,
      restaurant: restaurantId,
    });

    tables.push(table.id);
  }

  return tables;
};

const onComplete = async () => {
  const restaurants = await Restaurant.find({});

  for (const restaurant of restaurants) {
    const restaurantId: Types.ObjectId = restaurant._id;

    restaurant.tables = await createRandomTableForRestaurant(restaurantId);
    await restaurant.save();
  }
};

export default new Seeder<IRestaurant>(Restaurant, restaurantSeeds, onComplete);
