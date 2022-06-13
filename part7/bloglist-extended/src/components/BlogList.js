import React from 'react'
import Blog from './Blog'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  return (
    <Box>
      {[...blogs]
        .sort((b1, b2) => b2.likes - b1.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </Box>
  )
}

export default BlogList
