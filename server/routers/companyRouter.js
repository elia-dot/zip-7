import express from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  searchCompany,
} from '../controllers/companyController.js';

const router = express.Router();

router.get('/', protect, restrictTo('master'), getCompanies);
router.get('/:id', protect, getCompany);
router.patch('/:id', protect, updateCompany);
router.delete('/:id', protect, protect, restrictTo('master'), deleteCompany);
router.post('/', protect, restrictTo('master'), createCompany);
router.post('/search', protect, restrictTo('master'), searchCompany);

export default router;
