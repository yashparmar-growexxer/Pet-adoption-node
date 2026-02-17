import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Species from '../models/Species.js';

dotenv.config();

const seedSpecies = async () => {
  try {
    await connectDB();

    const defaultSpecies = ['dog', 'cat', 'horse', 'bird', 'rabbit', 'hamster', 'fish'];

    for (const name of defaultSpecies) {
      const speciesExists = await Species.findOne({ name });
      if (!speciesExists) {
        await Species.create({ name });
        console.log(`Species "${name}" created`);
      } else {
        console.log(`Species "${name}" already exists`);
      }
    }

    console.log('Species seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding species:', error);
    process.exit(1);
  }
};

seedSpecies();

