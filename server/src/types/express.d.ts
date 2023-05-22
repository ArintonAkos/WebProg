import ability from './ability';
import { IUser } from '../models/user';

declare global {
  namespace Express {
    interface Request {
      ability: typeof ability;
      user?: IUser;
    }
  }
}
