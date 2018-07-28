import express from 'express';
import users from './users';

const router = express.Router();

router.use('/', users);

router.use((err, req, res, next) => res.status(500).json({
  message: err.message
}));

export default router;