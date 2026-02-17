import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Pet from '../models/Pet.js';
import Species from '../models/Species.js';

dotenv.config();

const seedPets = async () => {
  try {
    await connectDB();

    // Ensure species exist
    const speciesList = ['dog', 'cat', 'horse'];
    for (const name of speciesList) {
      const speciesExists = await Species.findOne({ name });
      if (!speciesExists) {
        await Species.create({ name });
        console.log(`Species "${name}" created`);
      }
    }

    // Sample pet data
    const pets = [
      // 3 Dogs
      {
        name: 'Max',
        species: 'dog',
        breed: 'Golden Retriever',
        age: 2,
        description: 'Friendly and energetic Golden Retriever. Max loves playing fetch and going for long walks. He is great with kids and other pets. Fully vaccinated and house-trained.',
        image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800',
        status: 'Available',
      },
      {
        name: 'Bella',
        species: 'dog',
        breed: 'German Shepherd',
        age: 3,
        description: 'Loyal and intelligent German Shepherd. Bella is well-trained and protective. She enjoys outdoor activities and is looking for an active family. Great guard dog with a gentle heart.',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
        status: 'Available',
      },
      {
        name: 'Charlie',
        species: 'dog',
        breed: 'Labrador Retriever',
        age: 1,
        description: 'Playful and affectionate Labrador puppy. Charlie is full of energy and loves to play. He is very social and gets along well with everyone. Perfect for an active family.',
        image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800',
        status: 'Available',
      },
      // 1 Cat
      {
        name: 'Luna',
        species: 'cat',
        breed: 'Persian',
        age: 2,
        description: 'Beautiful and gentle Persian cat. Luna is calm and loves to cuddle. She is indoor-only and very clean. Perfect for someone looking for a quiet companion.',
        image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
        status: 'Available',
      },
      // 3 Horses
      {
        name: 'Thunder',
        species: 'horse',
        breed: 'Arabian',
        age: 5,
        description: 'Magnificent Arabian horse with excellent temperament. Thunder is well-trained and suitable for both riding and companionship. He is healthy, vaccinated, and ready for a loving home.',
        image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800',
        status: 'Available',
      },
      {
        name: 'Stella',
        species: 'horse',
        breed: 'Quarter Horse',
        age: 4,
        description: 'Gentle and reliable Quarter Horse. Stella is perfect for beginners and experienced riders alike. She is calm, well-mannered, and loves attention. Great for trail riding.',
        image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800',
        status: 'Available',
      },
      {
        name: 'Apollo',
        species: 'horse',
        breed: 'Thoroughbred',
        age: 6,
        description: 'Elegant Thoroughbred with a friendly personality. Apollo is energetic and loves to run. He is well-trained and suitable for experienced riders. Healthy and well-cared for.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        status: 'Available',
      },
    ];

    // Check if pets already exist
    let created = 0;
    let skipped = 0;

    for (const petData of pets) {
      const existingPet = await Pet.findOne({
        name: petData.name,
        species: petData.species,
      });

      if (existingPet) {
        console.log(`Pet "${petData.name}" (${petData.species}) already exists - skipped`);
        skipped++;
      } else {
        await Pet.create(petData);
        console.log(`Pet "${petData.name}" (${petData.species}) created`);
        created++;
      }
    }

    console.log(`\nPet seeding completed: ${created} created, ${skipped} skipped`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding pets:', error);
    process.exit(1);
  }
};

seedPets();

