import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { Permission } from '../models/permission';

export function defineAbilitiesFor(permissions: Permission[]) {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  permissions.forEach((permission) => {
    can(permission.action, permission.subject);
  });

  return build();
}
