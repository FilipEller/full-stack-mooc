import React, { useState } from 'react'
import { useMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Grid,
  List,
  ListItem,
} from '@mui/material'
import { likeBlog, deleteBlog, commentOnBlog } from '../reducers/blogReducer'

const BlogView = () => {
  const [content, setContent] = useState('')

  const match = useMatch('/blogs/:id')
  const [blogs, user] = useSelector(state => [state.blogs, state.user])
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  const dispatch = useDispatch()

  const addComment = async event => {
    event.preventDefault()
    dispatch(commentOnBlog({ content, blog }))
    setContent('')
  }

  if (!blog) {
    return
  }

  return (
    <Box
      sx={{
        fontFamily: 'Roboto',
        wordWrap: 'break-word',
        '& > div': {
          py: '5px',
        },
      }}>
      <Typography variant='h4' gutterBottom component='h4'>
        {blog.title}
      </Typography>
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
      <div>
        <Typography
          variant='h6'
          gutterBottom
          component='h6'
          sx={{ mt: 2, mb: 1 }}>
          Comments
        </Typography>
        <Box
          component='form'
          onSubmit={addComment}
          noValidate
          autoComplete='off'>
          <Grid
            container
            columnSpacing={4}
            sx={{ my: 0, '& .MuiFormControl-root': { mb: 1 } }}>
            <Grid item xs={9}>
              <FormControl fullWidth variant='standard' required>
                <InputLabel htmlFor='content-input'>New comment</InputLabel>
                <Input
                  id='content-input'
                  required
                  value={content}
                  onChange={({ target }) => setContent(target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Button variant='contained' type='submit'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
        <List
          sx={{
            '& > li': {
              px: 0,
              py: '5px',
            },
          }}>
          {blog.comments.map(comment => (
            <ListItem key={comment.id}>{comment.content}</ListItem>
          ))}
        </List>
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
    </Box>
  )
}

export default BlogView
