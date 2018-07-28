import express from 'express';

const router = express.Router();

router.route('/', (req, res) => {
  res.render('src/client/index')
});

export default router;