import React, { useState } from 'react'
import { Paper, Grid, Button, Box } from '@mui/material'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const gridStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  return (
    <Paper
      variant='outlined'
      elevation={4}
      sx={{
        fontFamily: 'Roboto',
        wordWrap: 'break-word',
        my: 2,
        p: 2,
      }}>
      <Grid container sx={gridStyle}>
        <Grid item xs={7}>
          <div>
            <div>
              <i>{blog.title}</i>
            </div>
            {showDetails && (
              <Box sx={{ '& div': { mt: 1 } }}>
                <div>
                  {'<'}
                  <a href={blog.url}>{blog.url}</a>
                  {'>'}
                </div>
                <div>User: {blog.user.username}</div>
                <div>
                  Likes: {blog.likes} <Button size='small'>Like</Button>
                </div>
              </Box>
            )}
          </div>
        </Grid>
        <Grid item xs={4} sx={gridStyle}>
          <div>{blog.author}</div>
          <Button
            sx={{ fontSize: 16 }}
            onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide' : 'View'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Blog
