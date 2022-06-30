import express from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import { getLogs } from '../controllers/logController.js';
import Log from '../models/Log.js';

const router = express.Router();

router.get('/', protect, restrictTo('master'), getLogs);

export default router;
