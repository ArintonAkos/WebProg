export interface IRedisRepository<T> {
  fetchAll: () => Promise<T[]>;
}
