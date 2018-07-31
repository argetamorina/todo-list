import express from 'express';

import auth from './auth';
import users from './users';
import todo from './todo';

import authMiddleware from '../middlewares/auth';

const router = express.Router();

router.use('/auth', auth);
router.use(authMiddleware);
router.use('/users', users);
router.use('/todo', todo);


router.use((err, req, res, next) => res.status(500).json({
  message: err.message
}));

export default router;
