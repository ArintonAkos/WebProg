import { model, Schema } from 'mongoose';
import { IUser } from '../types/user.types';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
  adminRestaurants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
  ],
  approved: {
    type: Boolean,
    default: false,
  },
});

const User = model<IUser>('User', userSchema);

export default User;
