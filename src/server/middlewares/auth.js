import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

export default (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(' ');

    if (token.length === 2) {
      token = token[1];

      jwt.verify(token, config.jwt.secret, (err, jwtPayload) => {
        if (err) {
          err.message = 'Authentication failed';

          return next(err);
        }

        User.findOne({
          email: jwtPayload.email
        }, (err, user) => {
          if (err) {
            return next(err);
          }

          if (user) {
            req.authUser = user;

            return next();
          } else {
            return next(new Error('User not found'));
          }
        });
      });
    } else {
      return next(new Error('Invalid authorization header'));
    }
  } else {
    return next(new Error('Missing authorization header'));
  }
};
