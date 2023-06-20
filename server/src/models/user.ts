import { model, Schema } from 'mongoose';
import { IPopulatedUserDocument, IUser } from '../types/user.types';
import RoleRepository from '../redis/repositories/RoleRepository';

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

userSchema.post<IPopulatedUserDocument>('findOne', async (doc: IPopulatedUserDocument) => {
  if (!doc.approved) {
    const userRole = await RoleRepository.getRoleWithPermissions('User');

    doc.roles = [userRole];
  }
});

const User = model<IUser>('User', userSchema);

export default User;
