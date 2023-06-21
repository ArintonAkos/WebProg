import { Model } from 'mongoose';

class Seeder<T> {
  constructor(private model: Model<T>, private seeds: T[], private onComplete: () => Promise<void> = async () => {}) {}

  public async run(): Promise<void> {
    try {
      const promises = this.seeds.map(async (seed) => {
        const record = await this.model.findOne(seed);
        if (!record) {
          await this.model.create(seed);
        }
      });

      await Promise.all(promises);
      await this.onComplete();

      console.log(`Seeded ${this.seeds.length} documents for model "${this.model.modelName}".`);
    } catch (err) {
      console.error(`Failed to seed data for model "${this.model.modelName}":`, err);
    }
  }
}

export default Seeder;
