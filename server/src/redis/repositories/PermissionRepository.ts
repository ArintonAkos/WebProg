import Permission, { IPermission } from '../../models/permission';
import BaseRepository from './BaseRepository';
import RoleRepository from './RoleRepository';

class PermissionRepository extends BaseRepository<IPermission> {
  protected getBaseRedisKey(): string {
    return 'permission';
  }

  protected getItemIdentifier(item: IPermission): string {
    return item.name;
  }

  async getPermissions(): Promise<IPermission[]> {
    const fetchAllCallback = () => this.fetchAll();
    const generateRedisKeyCallback = (item: IPermission) => this.generateRedisKey(item);

    return this.fetchFromRedisOrDB(fetchAllCallback.bind(this), generateRedisKeyCallback.bind(this));
  }

  async clearPermission(permissionName: string): Promise<void> {
    await this.clear(this.generateRedisKey({ name: permissionName } as IPermission));
  }

  async getPermissionsForRole(roleName: string): Promise<IPermission[]> {
    const role = await RoleRepository.getRole(roleName);
    return (role?.permissions ?? []) as IPermission[];
  }
}

export default new PermissionRepository(Permission);
