import * as mongoose from 'mongoose';
import config from './config';

const connectToDatabase = async () => {
  try {
    console.log('Connecting to database...');

    await mongoose.connect(config.databaseUrl);

    console.log('Connected to MongoDB database!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectFromDatabase = async () => {
  await mongoose.disconnect();
};

export default connectToDatabase;
