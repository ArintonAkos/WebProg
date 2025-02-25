import UserSeeder from './seeders/UserSeeder';
import connectToDatabase, { disconnectFromDatabase } from '../config/database';
import RestaurantSeeder from './seeders/RestaurantSeeder';
import RoleSeeder from './seeders/RoleSeeder';
import PermissionSeeder from './seeders/PermissionSeeder';

const seeders = [PermissionSeeder, RoleSeeder, UserSeeder, RestaurantSeeder];

const seedDatabase = async () => {
  try {
    console.log('Database seeding started!');

    const promises = seeders.map((seeder) => seeder.run());
    await Promise.all(promises);

    console.log('Database seeded!');

    await disconnectFromDatabase();

    console.log('Disconnected from database!');
  } catch (error) {
    console.error('Database seeding error:', error);
  }
};

connectToDatabase().then(async () => {
  await seedDatabase();
});
