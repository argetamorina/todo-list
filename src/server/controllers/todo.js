import Todo from '../models/todo';

class TodosController {

  load(req, res, next, id) {
    Todo.findOne({ _id: id })
      .then(list => {
        req.list = list;
        return next();
      })
      .catch(err => next(err));
  }

  all(req, res, next) {
    Todo.find({
      user: req.authUser._id
    })
      .sort({ createdAt: 'desc' })
      .populate('user')
      .then(lists => res.json(lists))
      .catch(err => next(err));
  }

  get(req, res, next) {
    return res.json(req.list);
  }

  create(req, res, next) {
    const data = {
      user: req.body.user,
      name: req.body.name
    };

    Todo.create(data)
      .then(todo => {
        todo.populate('user', () => res.json(todo));
      })
      .catch(err => next(err));
  }

  update(req, res, next) {
    req.list.completed = !Boolean(req.list.completed);

    req.list.save()
      .then(list => res.json(list))
      .catch(err => next(err));
  }

  destroy(req, res, next) {
    req.list.remove()
      .then(list => res.json({}))
      .catch(err => next(err));
  }

}

export default new TodosController;
