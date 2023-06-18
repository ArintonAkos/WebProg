import { addReservationSchema } from './schemas';
import { validationMiddleware } from '../../middlewares/validationMiddleware';

export const validateAddReservation = validationMiddleware(addReservationSchema);
