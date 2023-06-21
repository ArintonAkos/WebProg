import { Types } from 'mongoose';
import Seeder from './Seeder';
import Restaurant, { IRestaurant } from '../../models/restaurant';
import Table from '../../models/table';

const restaurantSeeds: IRestaurant[] = [
  {
    name: 'Café Bulgakov',
    phone: '0264 450 156',
    openingHours: '12:00 - 24:00',
    city: 'Kolozsvár',
    street: 'Inocențiu Micu Klein',
    number: '17',
    tables: [],
  },
  {
    name: 'Rhédey Café',
    phone: '0364 156 905',
    openingHours: '10:00 - 23:00',
    city: 'Kolozsvár',
    street: 'Piața Unirii',
    number: '9',
    tables: [],
  },
  {
    name: '1568 Bistro',
    phone: '0770 163 152',
    openingHours: '12:00 - 23:00',
    city: 'Kolozsvár',
    street: 'Bulevardul 21 Decembrie 1989',
    number: '14',
    tables: [],
  },
  {
    name: 'Insomnia Cafe & Bistro The oldest pub in town!',
    phone: '0741 245 315',
    openingHours: '12:00 - 02:00',
    city: 'Kolozsvár',
    street: 'Str. Universității',
    number: '2',
    tables: [],
  },
  {
    name: 'Samsara Foodhouse',
    phone: '0799 073 073',
    openingHours: '12:00 - 23:30',
    city: 'Kolozsvár',
    street: 'Cardinal Iuliu Hossu Street',
    number: '3',
    tables: [],
  },
];

const createRandomTableForRestaurant = async (restaurantId: Types.ObjectId): Promise<Types.ObjectId[]> => {
  const tables: Types.ObjectId[] = [];

  const tableCount = Math.floor(Math.random() * 10) + 1;
  const promises = Array.from({ length: tableCount }, async (_, i) => {
    const table = await Table.create({
      seats: Math.floor(Math.random() * 10) + 1,
      number: i + 1,
      restaurant: restaurantId,
    });

    tables.push(table.id);
  });

  await Promise.all(promises);

  return tables;
};

const onComplete = async () => {
  const restaurants = await Restaurant.find({});

  const promises = restaurants.map(async (restaurant) => {
    const restaurantId: Types.ObjectId = restaurant._id;

    restaurant.tables = await createRandomTableForRestaurant(restaurantId);
    await restaurant.save();

    console.log('Generated ', restaurant.tables.length, 'number of tables for restaurant: ', restaurant.name);
  });

  await Promise.all(promises);
};

export default new Seeder<IRestaurant>(Restaurant, restaurantSeeds, onComplete);
