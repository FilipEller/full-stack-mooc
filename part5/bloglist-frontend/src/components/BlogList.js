import React from 'react'
import Blog from './Blog'
import { Box } from '@mui/material'

const BlogList = ({ blogs, likeBlog }) => {
  return (
    <Box>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
      ))}
    </Box>
  )
}

export default BlogList
