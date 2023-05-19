import Seeder from './Seeder';
import News, { INews } from '../../models/news';

export const newsSeeds: INews[] = [
  {
    title: 'Első hír',
    content: 'Ez az első hír tartalma',
    timestamp: new Date(),
    imagePaths: [],
  },
  {
    title: 'Második hír',
    content: 'Ez a második hír tartalma',
    timestamp: new Date(),
    imagePaths: [],
  },
  {
    title: 'Harmadik hír',
    content: 'Ez a harmadik hír tartalma',
    timestamp: new Date(),
    imagePaths: [],
  },
  {
    title: 'Negyedik hír',
    content: 'Ez a negyedik hír tartalma',
    timestamp: new Date(),
    imagePaths: [],
  },
  {
    title: 'Ötödik hír',
    content: 'Ez az ötödik hír tartalma',
    timestamp: new Date(),
    imagePaths: [],
  },
  {
    title: 'Hatodik hír',
    content: 'Ez a hatodik hír tartalma',
    timestamp: new Date(),
    imagePaths: [],
  },
  {
    title: 'Hetedik hír',
    content: 'Ez a hetedik hír tartalma',
    timestamp: new Date(),
    imagePaths: [],
  },
  {
    title: 'Nyolcadik hír',
    content: 'Ez a nyolcadik hír tartalma',
    timestamp: new Date(),
    imagePaths: [],
  },
  {
    title: 'Kilencedik hír',
    content: 'Ez a kilencedik hír tartalma',
    timestamp: new Date(),
    imagePaths: [],
  },
  {
    title: 'Tizedik hír',
    content: 'Ez a tizedik hír tartalma',
    timestamp: new Date(),
    imagePaths: [],
  },
];

const newsSeeder = new Seeder<INews>(News, newsSeeds);

export default newsSeeder;
