import UserSeeder from './seeders/UserSeeder';
import connectToDatabase, { disconnectFromDatabase } from '../config/database';
import RestaurantSeeder from './seeders/RestaurantSeeder';

const seeders = [UserSeeder, RestaurantSeeder];

const seederPromises = seeders.map(async (seeder) => await seeder.run());

const seedDatabase = async () => {
  try {
    console.log('Database seeding started!');

    await Promise.all(seederPromises);

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
