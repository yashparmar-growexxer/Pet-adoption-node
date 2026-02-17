import express from 'express';
import { body } from 'express-validator';
import {
  createAdoption,
  getMyAdoptions,
  getAllAdoptions,
  updateAdoptionStatus,
} from '../controllers/adoptionController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/',
  protect,
  [body('petId').notEmpty().withMessage('Pet ID is required')],
  createAdoption
);

router.get('/my', protect, getMyAdoptions);

router.get('/', protect, admin, getAllAdoptions);

router.put(
  '/:id',
  protect,
  admin,
  [body('status').isIn(['Approved', 'Rejected']).withMessage('Invalid status')],
  updateAdoptionStatus
);

export default router;

