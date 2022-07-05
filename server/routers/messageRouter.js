import express from 'express';

import { protect } from '../controllers/authController.js';
import {
  getMessages,
  createMessage,
  deleteMessage,
  readMessage,
} from '../controllers/messageController.js';

const router = express.Router();

router.get('/', protect, getMessages);
router.post('/', protect, createMessage);
router.delete('/:id', protect, deleteMessage);
router.patch('/:id', protect, readMessage);

export default router;
