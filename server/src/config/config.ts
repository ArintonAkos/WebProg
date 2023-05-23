import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

export default {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27018/WebProg',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret',
  jwtExpiry: process.env.JWT_EXPIRY || '1h',
  refreshTokenExpiry: process.env.REFRESH_TOKEN || '7d',
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: process.env.REDIS_PORT || 6379,
};
