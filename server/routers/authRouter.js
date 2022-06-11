import express from 'express';
import {
  forgotPassword,
  login,
  protect,
  signup,
  createPassword,
  validateEmail,
  validatePasswordToken,
  updatePassword,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/validate-email/:token', protect, validateEmail);
router.post('/forgot-password', forgotPassword);
router.post('/validate-token', validatePasswordToken);
router.patch('/create-password', createPassword);
router.patch('/update-password', protect, updatePassword);

export default router;
