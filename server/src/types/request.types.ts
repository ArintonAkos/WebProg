import { Request as ExpressRequest } from 'express';
import { IPopulatedUser } from './user.types';
import { IAbility } from './ability.types';

interface Request extends ExpressRequest {
  ability?: IAbility;
  user?: IPopulatedUser;
}

export default Request;
