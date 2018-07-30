import jwt from 'jsonwebtoken';

import config from '../config';

import User from '../models/user';

class AuthController {

  login(req, res, next) {
    User.findOne({ email: req.body.email })
      .exec()
      .then(user => {
        if (!user) {
          return next(new Error('User not found'));
        }

        if (user.password === req.body.password) {
          const token = jwt.sign({
            email: user.email
          }, config.jwt.secret);

          return res.json({
            token,
            _id: user._id,
            name: user.name,
            email: user.email
          });
        } else {
          return next(new Error('Password incorrect'));
        }
      })
      .catch(err => {
        err.message = 'User not found';

        return next(err);
      });
  }
}

export default new AuthController;
