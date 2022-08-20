const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const redis = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  const value = await redis.getAsync('todoCount');
  const count = value ? Number(value) + 1 : 1;
  await redis.setAsync('todoCount', count);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { id } = req.todo;
  const { text, done } = req.body;
  await Todo.findByIdAndUpdate(id, { text, done }, { useFindAndModify: false });
  const updated = await Todo.findById(id);
  res.send(updated);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
