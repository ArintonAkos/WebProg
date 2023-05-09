import { Model } from 'mongoose';

class Seeder<T> {
  constructor(private model: Model<T>, private seeds: T[]) {}

  public async run(): Promise<void> {
    try {
      await this.model.create(this.seeds);
      console.log(`Seeded ${this.seeds.length} documents for model "${this.model.modelName}".`);
    } catch (err) {
      console.error(`Failed to seed data for model "${this.model.modelName}":`, err);
    }
  }
}

export default Seeder;
