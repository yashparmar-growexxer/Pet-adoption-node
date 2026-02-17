import Adoption from '../models/Adoption.js';
import Pet from '../models/Pet.js';
import { validationResult } from 'express-validator';
import { getIO } from '../config/socket.js';

export const createAdoption = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const pet = await Pet.findById(req.body.petId);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (pet.status === 'Adopted') {
      return res.status(400).json({ message: 'Pet is already adopted' });
    }

    const existingAdoption = await Adoption.findOne({
      user: req.user._id,
      pet: req.body.petId,
    });

    if (existingAdoption) {
      return res.status(400).json({ message: 'You have already applied for this pet' });
    }

    const adoption = await Adoption.create({
      user: req.user._id,
      pet: req.body.petId,
    });

    const populatedAdoption = await Adoption.findById(adoption._id)
      .populate('user', 'name email')
      .populate('pet');

    // Emit socket event to notify admin
    const io = getIO();
    io.to('admin').emit('new_adoption_request', {
      adoption: populatedAdoption,
      message: `New adoption request for ${populatedAdoption.pet.name} from ${populatedAdoption.user.name}`,
    });

    res.status(201).json(populatedAdoption);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already applied for this pet' });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getMyAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find({ user: req.user._id })
      .populate('pet')
      .sort({ createdAt: -1 });

    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find()
      .populate('user', 'name email')
      .populate('pet')
      .sort({ createdAt: -1 });

    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdoptionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const adoption = await Adoption.findById(req.params.id).populate('pet');

    if (!adoption) {
      return res.status(404).json({ message: 'Adoption application not found' });
    }

    adoption.status = status;
    await adoption.save();

    if (status === 'Approved') {
      adoption.pet.status = 'Adopted';
      await adoption.pet.save();
    }

    const updatedAdoption = await Adoption.findById(adoption._id)
      .populate('user', 'name email')
      .populate('pet');

    // Emit socket event to notify user
    const io = getIO();
    const userId = updatedAdoption.user._id.toString();
    io.to(`user:${userId}`).emit('adoption_status_update', {
      adoption: updatedAdoption,
      message: `Your adoption request for ${updatedAdoption.pet.name} has been ${status.toLowerCase()}`,
      status: status,
    });

    // Also notify admin room about the update
    io.to('admin').emit('adoption_status_updated', {
      adoption: updatedAdoption,
      message: `Adoption request for ${updatedAdoption.pet.name} has been ${status.toLowerCase()}`,
    });

    res.json(updatedAdoption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

