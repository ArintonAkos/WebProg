import Seeder from './Seeder';
import Role, { IRole } from '../../models/role';
import Permission from '../../models/permission';

const roleSeeds: IRole[] = [
  {
    name: 'User',
    permissions: [],
  },
  {
    name: 'Admin',
    permissions: [],
  },
  {
    name: 'Moderator',
    permissions: [],
  },
];

const onComplete = async () => {
  const roles = await Role.find({});
  const permissions = await Permission.find({});

  console.log(permissions);

  for (const role of roles) {
    switch (role.name) {
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
  }
};

const getPermissionsForRole = (permissions, actions) => {
  console.log(
    permissions
      .filter((permission) => {
        const [action, _] = permission.name.split(' ');
        return actions.includes(action);
      })
      .map((permission) => permission._id),
  );

  return permissions
    .filter((permission) => {
      const [action, _] = permission.name.split(' ');
      return actions.includes(action);
    })
    .map((permission) => permission._id);
};

export default new Seeder<IRole>(Role, roleSeeds, onComplete);
