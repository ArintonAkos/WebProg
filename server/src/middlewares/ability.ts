import { NextFunction, Request, Response } from 'express';
import Role from '../models/role';

const abilityMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new Error('No user attached to request'));
  }

  const userRoles = await Role.find({ _id: { $in: req.user.roles } })
    .populate('permissions')
    .exec();

  const userAbilities = userRoles.reduce((abilities, role) => {
    const roleAbilities = role.permissions.map((permission) => ({
      action: permission.name,
      subject: permission.subject,
    }));

    return [...abilities, ...roleAbilities];
  }, [] as Array<{ action: Action; subject: Subject }>);

  req.ability = new Ability(userAbilities);

  return next();
};
