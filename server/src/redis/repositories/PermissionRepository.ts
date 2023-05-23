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
    return this.fetchFromRedisOrDB(() => this.fetchAll(), this.generateRedisKey);
  }

  async clearPermission(permissionName: string): Promise<void> {
    await this.clear(this.generateRedisKey({ name: permissionName } as IPermission));
  }

  async getPermissionsForRole(roleName: string): Promise<IPermission[]> {
    return (await RoleRepository.getRole(roleName)).permissions as IPermission[];
  }
}

export default new PermissionRepository(Permission);
