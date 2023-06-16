import User from '../../models/user';
import Seeder from './Seeder';
import bcrypt from 'bcryptjs';
import Role from '../../models/role';
import { IUser } from '../../types/user.types';

const onComplete = async () => {
  const roles = await Role.find();
  const roleIds = {
    User: roles.find((role) => role.name === 'User')?._id,
    Admin: roles.find((role) => role.name === 'Admin')?._id,
    Moderator: roles.find((role) => role.name === 'Moderator')?._id,
  };

  const userSeeds: IUser[] = [
    {
      name: 'Arinton Akos',
      email: 'arintonakos@gmail.com',
      password: bcrypt.hashSync('Asd@1234', 10),
      roles: [roleIds['Admin']],
      adminRestaurants: [],
      phone: '0723150884',
    },
  ];

  await User.insertMany(userSeeds);
};

export default new Seeder<IUser>(User, [], onComplete);
