import mongoose from 'mongoose';

export interface IPermission {
  name: string;
  description: string;
}

const permissionSchema = new mongoose.Schema<IPermission>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const Permission = mongoose.model<IPermission>('Permission', permissionSchema);

export default Permission;
