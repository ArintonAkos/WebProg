import { Schema, model, Types } from 'mongoose';

export interface INewsSimilarity {
  news1: Types.ObjectId;
  news2: Types.ObjectId;
  similarityFactor: number;
}

const newsSimilaritySchema = new Schema<INewsSimilarity>({
  news1: { type: Schema.Types.ObjectId, ref: 'News', required: true },
  news2: { type: Schema.Types.ObjectId, ref: 'News', required: true },
  similarityFactor: { type: Number, min: 0, max: 1, required: true },
});

const NewsSimilarity = model<INewsSimilarity>('NewsSimilarity', newsSimilaritySchema);

export default NewsSimilarity;
