import ability from './ability';
import User from '../models/user';

declare global {
  namespace Express {
    interface Request {
      ability: typeof ability;
      user?: typeof User;
    }
  }
}
