import { Types } from 'mongoose';
import Seeder from './Seeder';
import Role, { IRole } from '../../models/role';
import Permission from '../../models/permission';
import RoleRepository from '../../redis/repositories/RoleRepository';

const roleSeeds: IRole[] = [
  {
    _id: new Types.ObjectId('5f9d88f4e8a25f1b7c3d3b1e'),
    name: 'Guest',
    permissions: [],
  },
  {
    _id: new Types.ObjectId('5f9d88f4e8a25f1b7c3d3b1f'),
    name: 'User',
    permissions: [],
  },
  {
    _id: new Types.ObjectId('5f9d88f4e8a25f1b7c3d3b20'),
    name: 'Admin',
    permissions: [],
  },
  {
    _id: new Types.ObjectId('5f9d88f4e8a25f1b7c3d3b21'),
    name: 'Moderator',
    permissions: [],
  },
];

const getPermissionsForRole = (permissions, actions) =>
  permissions
    .filter((permission) => {
      const [action] = permission.name.split(' ');
      return actions.includes(action);
    })
    .map((permission) => permission._id);

const onComplete = async () => {
  const roles = await Role.find({});
  const permissions = await Permission.find({});

  const promises = roles.map(async (role) => {
    switch (role.name) {
      case 'Guest':
        role.permissions = getPermissionsForRole(permissions, ['read']);
        break;
      case 'User':
        role.permissions = getPermissionsForRole(permissions, ['read']);
        break;
      case 'Moderator':
        role.permissions = getPermissionsForRole(permissions, ['read', 'update']);
        break;
      case 'Admin':
        role.permissions = getPermissionsForRole(permissions, ['read', 'update', 'create', 'delete']);
        break;
      default:
        console.log(`No permissions defined for role: ${role.name}`);
    }

    await role.save();
  });

  await Promise.all(promises);
  await RoleRepository.clearAll();
};

export default new Seeder<IRole>(Role, roleSeeds, onComplete);
