import React from 'react'
import { useMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const BlogView = () => {
  const match = useMatch('/blogs/:id')
  const [blogs, user] = useSelector(state => [state.blogs, state.user])
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  const dispatch = useDispatch()

  if (!blog) {
    return
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        {'<'}
        <a href={blog.url}>{blog.url}</a>
        {'>'}
      </div>
      <div>Added by {blog.user.name}</div>
      <div>
        Likes: {blog.likes}{' '}
        <Button size='small' onClick={() => dispatch(likeBlog(blog))}>
          Like
        </Button>
      </div>
      {user.username === blog.user.username && (
        <div>
          <Button
            variant='outlined'
            size='small'
            onClick={() => dispatch(deleteBlog(blog))}>
            Delete
          </Button>
        </div>
      )}
    </div>
  )
}

export default BlogView
