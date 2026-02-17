import express from 'express';
import { body } from 'express-validator';
import {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
} from '../controllers/petController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPets);
router.get('/:id', getPetById);
router.post(
  '/',
  protect,
  admin,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('species').trim().notEmpty().withMessage('Species is required'),
    body('breed').trim().notEmpty().withMessage('Breed is required'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive number'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('image').trim().notEmpty().withMessage('Image URL is required'),
  ],
  createPet
);
router.put(
  '/:id',
  protect,
  admin,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('species').optional().trim().notEmpty().withMessage('Species cannot be empty'),
    body('breed').optional().trim().notEmpty().withMessage('Breed cannot be empty'),
    body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive number'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('image').optional().trim().notEmpty().withMessage('Image URL cannot be empty'),
  ],
  updatePet
);
router.delete('/:id', protect, admin, deletePet);

export default router;

