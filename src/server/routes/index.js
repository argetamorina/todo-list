import express from 'express';

import auth from './auth';
import users from './users';

const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);

router.use((err, req, res, next) => res.status(500).json({
  message: err.message
}));

export default router;
