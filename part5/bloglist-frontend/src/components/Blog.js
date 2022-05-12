import React from 'react'
import { Box } from '@mui/material'

const Blog = ({ blog }) => (
  <Box
    sx={{
      fontFamily: 'Roboto',
      my: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
    <i>{blog.title}</i>
    <span>{blog.author}</span>
  </Box>
)

export default Blog
