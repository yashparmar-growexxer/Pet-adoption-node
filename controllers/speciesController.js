import Species from '../models/Species.js';
import { validationResult } from 'express-validator';

export const getSpecies = async (req, res) => {
  try {
    const species = await Species.find().sort({ name: 1 });
    res.json(species);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSpecies = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const speciesExists = await Species.findOne({
      name: name.toLowerCase().trim(),
    });

    if (speciesExists) {
      return res.status(400).json({ message: 'Species already exists' });
    }

    const species = await Species.create({ name: name.toLowerCase().trim() });
    res.status(201).json(species);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Species already exists' });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteSpecies = async (req, res) => {
  try {
    const species = await Species.findById(req.params.id);

    if (!species) {
      return res.status(404).json({ message: 'Species not found' });
    }

    await species.deleteOne();
    res.json({ message: 'Species removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

