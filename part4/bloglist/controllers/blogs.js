const router = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

// CREATE
router.post('/', userExtractor, async (req, res, next) => {
  const { title, author, url, likes } = req.body
  const { user } = req

  const blogToCreate = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  })

  const result = await blogToCreate.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  res.status(201).json(result)
})

// READ ALL
router.get('/', async (req, res, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

// UPDATE
router.put('/:id', userExtractor, async (req, res, next) => {
  const { user } = req

  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(403).json({ error: 'updating not permitted' })
  }

  const { title, author, url, likes } = req.body
  const blogToUpdate = {
    title,
    author,
    url,
    likes,
    user,
  }

  const result = await Blog.findByIdAndUpdate(req.params.id, blogToUpdate, {
    new: true,
  })
  res.json(result)
})

// DELETE
router.delete('/:id', userExtractor, async (req, res, next) => {
  const { user } = req

  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(204).end()
  }

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(403).json({ error: 'deletion not permitted' })
  }

  await blog.remove()
  res.status(204).end()
})

module.exports = router
