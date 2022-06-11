import express from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import {createUser, getUsers, getUser, updateUser, deleteUser, toggleBlock, searchUser} from '../controllers/userController.js';

const router = express.Router();

router.post('/create-user', protect, restrictTo('master'), createUser)
router.get('/', protect, restrictTo('master'), getUsers);
router.get('/:id', protect, getUser);
router.patch('/:id', protect, updateUser);
router.patch('/:id/block', protect, restrictTo('master'), toggleBlock);
router.delete('/:id', protect, restrictTo('master'), deleteUser);
router.post('/search', protect, restrictTo('master'), searchUser);


export default router;