import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Input,
} from '@mui/material'

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = async () => {
    event.preventDefault()
    const data = await createBlog({ title, author, url })
    if (data) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <Box
      component='form'
      onSubmit={onSubmit}
      sx={{ my: 3, '& .MuiFormControl-root': { my: 2 } }}
      noValidate
      autoComplete='off'>
      <Typography variant='h4' gutterBottom component='div'>
        Create a Blog
      </Typography>
      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='standard-adornment-amount'>Title</InputLabel>
        <Input
          id='standard-adornment-amount'
          startAdornment={<InputAdornment position='start'></InputAdornment>}
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </FormControl>
      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='standard-adornment-amount'>Author</InputLabel>
        <Input
          id='standard-adornment-amount'
          startAdornment={<InputAdornment position='start'></InputAdornment>}
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </FormControl>
      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='standard-adornment-amount'>URL</InputLabel>
        <Input
          id='standard-adornment-amount'
          startAdornment={<InputAdornment position='start'></InputAdornment>}
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button fullWidth variant='contained' type='submit'>
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default CreateBlogForm
