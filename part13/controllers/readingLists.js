const router = require('express').Router();
const { Reading } = require('../models');

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body;

  if (!(blogId && userId)) {
    return res.status(400).send({ error: 'blogId or userId missing' });
  }

  const reading = await Reading.create({ blogId, userId });
  return res.send(reading);
});

module.exports = router;
