import React, { useState } from 'react'
import { TextField, Box, Typography, Button } from '@mui/material'
import { handleLogin } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const onLogin = event => {
    event.preventDefault()
    dispatch(handleLogin(username, password))
  }

  return (
    <Box
      component='form'
      onSubmit={onLogin}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography variant='h4' gutterBottom component='h4'>
        Log in
      </Typography>
      <Box
        sx={{
          '& > .input': {
            mb: 2,
            width: '40ch',
          },
        }}
        noValidate
        autoComplete='off'>
        <div className='input'>
          <TextField
            label='Username'
            variant='outlined'
            required
            value={username}
            fullWidth
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className='input'>
          <TextField
            label='Password'
            variant='outlined'
            type='password'
            required
            value={password}
            fullWidth
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
      </Box>
      <Button sx={{ px: 2 }} variant='contained' type='submit'>
        Log in
      </Button>
    </Box>
  )
}

export default LoginForm
