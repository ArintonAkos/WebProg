import User, { IUser } from '../../models/user';
import Seeder from './Seeder';
import bcrypt from 'bcryptjs';
import Role from '../../models/role';

const onComplete = async () => {
  const roles = await Role.find();
  const roleIds = {
    User: roles.find((role) => role.name === 'User')?._id,
    Admin: roles.find((role) => role.name === 'Admin')?._id,
    Moderator: roles.find((role) => role.name === 'Moderator')?._id,
  };

  const userSeeds: IUser[] = [
    {
      name: 'István Nagy',
      email: 'nagy.istvan@gmail.com',
      password: bcrypt.hashSync('jelszo1', 10),
      roles: [roleIds['User']],
    },
    {
      name: 'Erzsébet Tóth',
      email: 'toth.erzsebet@gmail.com',
      password: bcrypt.hashSync('jelszo2', 10),
      roles: [roleIds['Admin']],
    },
    {
      name: 'Péter Szabó',
      email: 'szabo.peter@gmail.com',
      password: bcrypt.hashSync('jelszo3', 10),
      roles: [roleIds['Moderator']],
    },
    {
      name: 'Mária Kovács',
      email: 'kovacs.maria@gmail.com',
      password: bcrypt.hashSync('jelszo4', 10),
      roles: [roleIds['User']],
    },
    {
      name: 'József Horváth',
      email: 'horvath.jozsef@gmail.com',
      password: bcrypt.hashSync('jelszo5', 10),
      roles: [roleIds['User']],
    },
  ];

  await User.insertMany(userSeeds);
};

export default new Seeder<IUser>(User, [], onComplete);
