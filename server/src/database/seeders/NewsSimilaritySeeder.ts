import NewsSimilarity, { INewsSimilarity } from '../../models/news_similarity';
import Seeder from './Seeder';
import { newsSeeds } from './NewsSeeder';
import { Types } from 'mongoose';

const newsSimilaritySeeds: INewsSimilarity[] = [
  {
    news1: new Types.ObjectId(newsSeeds[0]['_id']),
    news2: new Types.ObjectId(newsSeeds[0]['_id']),
    similarityFactor: 0.7,
  },
  {
    news1: new Types.ObjectId(newsSeeds[0]['_id']),
    news2: new Types.ObjectId(newsSeeds[2]['_id']),
    similarityFactor: 0.6,
  },
  {
    news1: new Types.ObjectId(newsSeeds[0]['_id']),
    news2: new Types.ObjectId(newsSeeds[3]['_id']),
    similarityFactor: 0.8,
  },
  {
    news1: new Types.ObjectId(newsSeeds[1]['_id']),
    news2: new Types.ObjectId(newsSeeds[2]['_id']),
    similarityFactor: 0.5,
  },
  {
    news1: new Types.ObjectId(newsSeeds[1]['_id']),
    news2: new Types.ObjectId(newsSeeds[3]['_id']),
    similarityFactor: 0.6,
  },
  {
    news1: new Types.ObjectId(newsSeeds[2]['_id']),
    news2: new Types.ObjectId(newsSeeds[3]['_id']),
    similarityFactor: 0.9,
  },
];

const newsSimilaritySeeder = new Seeder<INewsSimilarity>(NewsSimilarity, newsSimilaritySeeds);

export default newsSimilaritySeeder;
