import express from 'express';

import usersController from '../controllers/users';

const router = express.Router();

router.route('/')
  .post(usersController.create);

export default router;