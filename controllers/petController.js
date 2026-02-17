import Pet from '../models/Pet.js';
import Species from '../models/Species.js';
import { validationResult } from 'express-validator';

export const getPets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const query = {};

    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { breed: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    if (req.query.species) {
      query.species = req.query.species.toLowerCase().trim();
    }

    if (req.query.breed) {
      query.breed = { $regex: req.query.breed, $options: 'i' };
    }

    if (req.query.age) {
      query.age = parseInt(req.query.age);
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    const pets = await Pet.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Pet.countDocuments(query);

    res.json({
      pets,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Validate species exists
    if (req.body.species) {
      const species = await Species.findOne({
        name: req.body.species.toLowerCase().trim(),
      });
      if (!species) {
        return res.status(400).json({ message: 'Invalid species. Please select from predefined species.' });
      }
      req.body.species = species.name;
    }

    const pet = await Pet.create(req.body);
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Validate species exists
    if (req.body.species) {
      const species = await Species.findOne({
        name: req.body.species.toLowerCase().trim(),
      });
      if (!species) {
        return res.status(400).json({ message: 'Invalid species. Please select from predefined species.' });
      }
      req.body.species = species.name;
    }

    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (pet) {
      await pet.deleteOne();
      res.json({ message: 'Pet removed' });
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

