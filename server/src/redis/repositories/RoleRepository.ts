import Role, { IRole } from '../../models/role';
import BaseRepository from './BaseRepository';
import { IPopulatedRole } from '../../types/role.types';
import PermissionRepository from './PermissionRepository';

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

    return await this.fetchFromRedisOrDB(fetchAllCallback.bind(this), generateRedisKeyCallback.bind(this));
  }

  async getRole(roleName: string): Promise<IRole | null> {
    const roles = await this.getRoles();

    return roles?.find((r) => r.name === roleName);
  }

  async clearRole(roleName: string): Promise<void> {
    await this.clear(this.generateRedisKey({ name: roleName } as IRole));
  }

  async getRoleWithPermissions(roleName: string): Promise<IPopulatedRole> {
    const role: IPopulatedRole = await Role.findOne({ name: roleName }).populate('permissions');
    role.permissions = await PermissionRepository.getPermissionsForRole(role.name);

    if (!role) {
      throw new Error(`Role ${roleName} not found`);
    }

    return role;
  }
}

export default new RoleRepository(Role);
