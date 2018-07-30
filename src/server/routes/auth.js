import express from 'express';

import authController from '../controllers/auth';

const router = express.Router();

router.route('/login')
  .post(authController.login);

export default router;