import express from 'express';
import { body } from 'express-validator';
import {
  getSpecies,
  createSpecies,
  deleteSpecies,
} from '../controllers/speciesController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSpecies);
router.post(
  '/',
  protect,
  admin,
  [body('name').trim().notEmpty().withMessage('Species name is required')],
  createSpecies
);
router.delete('/:id', protect, admin, deleteSpecies);

export default router;

