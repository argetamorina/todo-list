import User from '../models/user';

class UsersController {

  create(req, res, next) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    User.create(data)
      .then(user => res.json(user))
      .catch(err => next(err));
  }
}

export default new UsersController;
