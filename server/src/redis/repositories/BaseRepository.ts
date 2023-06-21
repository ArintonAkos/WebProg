import { Model } from 'mongoose';
import { IRedisRepository } from './IRedisRepository';
import { redis } from '../index';

abstract class BaseRepository<T> implements IRedisRepository<T> {
  constructor(private model: Model<T>) {}

  async fetchAll(): Promise<T[]> {
    return await this.model.find({}).exec();
  }

  async store(item: T): Promise<void> {
    const data = JSON.stringify(item);
    const redisKey = this.generateRedisKey(item);

    await redis.set(redisKey, data);
  }

  async get(redisKey: string): Promise<T> {
    const data = await redis.get(redisKey);

    if (data) {
      return JSON.parse(data);
    }

    return null;
  }

  async clear(redisKey: string): Promise<void> {
    await redis.del(redisKey);
  }

  async clearAll(): Promise<void> {
    const pattern = this.generateRedisKey('*');
    const keys = await redis.keys(pattern);

    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }

  async fetchFromRedisOrDB(fetchFunction: () => Promise<T[]>, generateRedisKey: (item: T) => string): Promise<T[]> {
    const items = await fetchFunction();
    const storedItems = [];

    const promises = items.map(async (item) => {
      const redisKey = generateRedisKey(item);
      let data = await redis.get(redisKey);

      if (!data) {
        await this.store(item);
        data = await redis.get(redisKey);
      }

      storedItems.push(JSON.parse(data));
    });

    await Promise.all(promises);

    return storedItems;
  }

  protected abstract getBaseRedisKey(): string;
  protected abstract getItemIdentifier(item: T): string;

  public generateRedisKey(item: T | string): string {
    let itemIdentifier = item;

    if (typeof item !== 'string') {
      itemIdentifier = this.getItemIdentifier(item);
    }

    return `${this.getBaseRedisKey()}:${itemIdentifier}`;
  }
}

export default BaseRepository;
