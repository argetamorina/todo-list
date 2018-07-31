import express from 'express';

import authController from '../controllers/auth';
import usersController from '../controllers/users';

const router = express.Router();

router.route('/login')
  .post(authController.login);

router.route('/register')
  .post(usersController.create);

export default router;