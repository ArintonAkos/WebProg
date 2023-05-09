import UserModel, { User } from '../../models/user';
import Seeder from './Seeder';
import bcrypt from 'bcryptjs';

const userSeeds: User[] = [
  {
    name: 'István Nagy',
    email: 'nagy.istvan@gmail.com',
    password: bcrypt.hashSync('jelszo1', 10),
  },
  {
    name: 'Erzsébet Tóth',
    email: 'toth.erzsebet@gmail.com',
    password: bcrypt.hashSync('jelszo2', 10),
  },
  {
    name: 'Péter Szabó',
    email: 'szabo.peter@gmail.com',
    password: bcrypt.hashSync('jelszo3', 10),
  },
  {
    name: 'Mária Kovács',
    email: 'kovacs.maria@gmail.com',
    password: bcrypt.hashSync('jelszo4', 10),
  },
  {
    name: 'József Horváth',
    email: 'horvath.jozsef@gmail.com',
    password: bcrypt.hashSync('jelszo5', 10),
  },
];

export default new Seeder<User>(UserModel, userSeeds);
