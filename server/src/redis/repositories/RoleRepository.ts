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
    const fetchAllCallback = () => this.fetchAll();
    const generateRedisKeyCallback = (item: IRole) => this.generateRedisKey(item);

    return this.fetchFromRedisOrDB(fetchAllCallback.bind(this), generateRedisKeyCallback.bind(this));
  }

  async getRole(roleName: string): Promise<IRole | null> {
    const roles = await this.getRoles();

    return roles?.find((r) => r.name === roleName);
  }

  async clearRole(roleName: string): Promise<void> {
    await this.clear(this.generateRedisKey({ name: roleName } as IRole));
  }
}

export default new RoleRepository(Role);
