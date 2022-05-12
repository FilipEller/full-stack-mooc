import React from 'react'
import Blog from './Blog'
import { Box } from '@mui/material'

const BlogList = ({ blogs }) => {
  return (
    <Box>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </Box>
  )
}

export default BlogList
