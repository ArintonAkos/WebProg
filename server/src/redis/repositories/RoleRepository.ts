import Role, { IRole } from '../../models/role';
import BaseRepository from './BaseRepository';

class RoleRepository extends BaseRepository<IRole> {
  protected getBaseRedisKey(): string {
    return 'role';
  }

  protected getItemIdentifier(item: IRole): string {
    return item.name;
  }

  async getRoles(): Promise<IRole[]> {
    return this.fetchFromRedisOrDB(() => this.fetchAll(), this.generateRedisKey);
  }

  async getRole(roleName: string): Promise<IRole | null> {
    return this.get(this.generateRedisKey({ name: roleName } as IRole));
  }

  async clearRole(roleName: string): Promise<void> {
    await this.clear(this.generateRedisKey({ name: roleName } as IRole));
  }
}

export default new RoleRepository(Role);
