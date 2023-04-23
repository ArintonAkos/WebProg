import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

export default {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/WebProg',
};
