import express from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import { addReport, getReports, getReport } from '../controllers/reportController.js';

const router = express.Router();

router.post('/', protect, restrictTo('master'), addReport)
router.get('/', protect, getReports)
router.get('/:id', protect, getReport)

export default router;