import express from 'express';

import { protect, restrictTo } from '../controllers/authController.js';
import { addReview, deleteReview, editReview, getReview, getReviews } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', protect, restrictTo('master'), addReview)
router.get('/', protect, restrictTo('master'), getReviews)
router.get('/:id', protect, restrictTo('master'), getReview)
router.patch('/:id', protect, restrictTo('master'), editReview)
router.delete('/:id', protect, restrictTo('master'), deleteReview)



export default router;