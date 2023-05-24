import { NextFunction, Response } from 'express';
import { createMongoAbility } from '@casl/ability';
import { Types } from 'mongoose';
import Action from '../types/action.types';
import Subject from '../types/subject.types';
import Request from '../types/request.types';
import PermissionRepository from '../redis/repositories/PermissionRepository';

const ability = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new Error('No user attached to request'));
  }

  const userAbilities = await Promise.all(
    req.user.roles.map(async (role) => {
      const rolePermissions = await PermissionRepository.getPermissionsForRole(role.name);

      return rolePermissions.map((permission) => {
        if (permission instanceof Types.ObjectId) {
          throw new Error('Permissions should be populated');
        }

        return {
          action: permission.name as Action,
          subject: permission.subject as Subject,
        };
      });
    }),
  );

  const abilities = userAbilities.flat();

  req.ability = createMongoAbility(abilities);

  return next();
};

export default ability;
