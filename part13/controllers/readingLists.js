const router = require('express').Router();
const { Reading } = require('../models');
const { tokenExtractor, userExtractor } = require('../util/middleware');

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body;

  if (!(blogId && userId)) {
    return res.status(400).send({ error: 'blogId or userId missing' });
  }

  const reading = await Reading.create({ blogId, userId });
  return res.send(reading);
});

router.put('/:id', tokenExtractor, userExtractor, async (req, res) => {
  if (!req.user) {
    return res.status(401).end();
  }
  const { id } = req.params;
  const reading = await Reading.findByPk(id);
  if (!reading) {
    return res.status(404).end();
  }

  const { id: userId } = req.user;
  if (userId !== reading.userId) {
    return res.status(403).end();
  }

  const { read } = req.body;
  if (typeof read !== 'boolean') {
    return res.status(400).send({ error: 'Invalid or missing reading status' });
  }

  reading.read = read;
  await reading.save();
  return res.status(200).send(reading);
});

module.exports = router;
