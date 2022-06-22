import express from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import {
  addReport,
  getReports,
  getReport,
  editReport,
  deleteReport,
  getReportsByCompany,
  searchReportByMachine,
  getMachines,
} from '../controllers/reportController.js';

const router = express.Router();

router.post('/', protect, restrictTo('master'), addReport);
router.get('/', protect, getReports);
router.get('/machines', protect, restrictTo('master'), getMachines);
router.get('/:id', protect, getReport);
router.patch('/:id', protect, restrictTo('master'), editReport);
router.delete('/:id', protect, restrictTo('master'), deleteReport);
router.get('/:companyId', protect, restrictTo('master'), getReportsByCompany);
router.get(
  '/search/:machine',
  protect,
  restrictTo('master'),
  searchReportByMachine
);
router.get('/machines', protect, restrictTo('master'), getMachines);

export default router;
