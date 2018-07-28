import express from 'express';

const router = express.Router();

router.route('/', (req, res) => {
  res.render('dist/index.html');
});

export default router;