import { model, Schema, Types } from 'mongoose';

interface IRole {
  name: string;
  permissions: [Types.ObjectId];
}

const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
});

const Role = model<IRole>('Role', roleSchema);

export default Role;
