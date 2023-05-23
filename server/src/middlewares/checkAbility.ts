import { NextFunction, Response } from 'express';
import Subject from '../types/subject.types';
import Action from '../types/action.types';
import Request from '../types/request.types';

export function checkAbility(action: Action, subject: Subject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { ability } = req;

    if (ability.can(action, subject)) {
      next();
    } else {
      res.status(403).json({ error: 'You are not authorized to perform this action.' });
    }
  };
}
