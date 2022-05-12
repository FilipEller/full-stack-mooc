import React from 'react'
import {
  TextField,
  Box,
  Typography,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Input,
} from '@mui/material'

const CreateBlogForm = () => {
  return (
    <Box
      component='form'
      onSubmit={() => console.log('submitted')}
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
        />
      </FormControl>
      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='standard-adornment-amount'>Author</InputLabel>
        <Input
          id='standard-adornment-amount'
          startAdornment={<InputAdornment position='start'></InputAdornment>}
        />
      </FormControl>
      <FormControl fullWidth variant='standard'>
        <InputLabel htmlFor='standard-adornment-amount'>URL</InputLabel>
        <Input
          id='standard-adornment-amount'
          startAdornment={<InputAdornment position='start'></InputAdornment>}
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
