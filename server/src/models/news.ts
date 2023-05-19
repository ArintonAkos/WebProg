import { Schema, model } from 'mongoose';

export interface INews {
  title: string;
  content: string;
  timestamp: Date;
  imagePaths: string[];
}

const newsSchema = new Schema<INews>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, required: true },
  imagePaths: { type: [String], required: true },
});

const News = model<INews>('News', newsSchema);

export default News;
