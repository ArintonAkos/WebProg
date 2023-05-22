import { NextFunction, Request, Response } from 'express';
import Role from '../models/role';
import { createMongoAbility } from '@casl/ability';
import { Types } from 'mongoose';

const ability = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new Error('No user attached to request'));
  }

  const userRoles = await Role.find({ _id: { $in: req.user.roles } })
    .populate('permissions')
    .exec();

  const userAbilities = userRoles.reduce((abilities, role) => {
    const roleAbilities = role.permissions.map((permission) => {
      if (permission instanceof Types.ObjectId) {
        throw new Error('Permissions should be populated');
      }

      return {
        action: permission.name as Action,
        subject: permission.subject as Subject,
      };
    });

    return [...abilities, ...roleAbilities];
  }, [] as Array<{ action: Action; subject: Subject }>);

  req.ability = createMongoAbility(userAbilities);

  return next();
};

export default ability;
