import React from 'react'
import { Box } from '@mui/material'

const Blog = ({ blog }) => (
  <Box sx={{ fontFamily: 'Roboto', m: 1 }}>
    {blog.title} {blog.author}
  </Box>
)

export default Blog
