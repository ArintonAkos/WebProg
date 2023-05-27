import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import User from '../models/user';
import { guestPermissions } from './guestPermissions';
import { Permission } from '../models/permission';

export default function defineAbilityFor(user?: User) {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  let permissions: Permission[] = guestPermissions;

  if (user) {
    permissions = user.permissions;
  }

  permissions.forEach((permission) => {
    can(permission.action, permission.subject);
  });

  return build();
}
