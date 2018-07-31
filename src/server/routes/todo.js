import express from 'express';

import listsController from '../controllers/todo';

const router = express.Router();

router.route('/')
  .get(listsController.all)
  .post(listsController.create);

// router.route('/:listId')
//   .get(listsController.get)
//   .patch(listsController.update)
//   .delete(listsController.destroy);

// router.param('listId', listsController.load);

export default router;
