import { model, Schema, Types } from 'mongoose';
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
});

const User = model<IUser>('User', userSchema);

export default User;
