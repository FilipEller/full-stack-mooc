import React, { useState, useEffect } from 'react'
import { TextField, Box, Typography, Button } from '@mui/material'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = event => {
    event.preventDefault()
    handleLogin(username, password)
  }

  return (
    <form onSubmit={onLogin}>
      <Typography variant='h4' gutterBottom component='div'>
        Log in
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            '& .MuiTextField-root': { mb: 1, width: '25ch' },
          }}
          noValidate
          autoComplete='off'>
          <div>
            <TextField
              label='Username'
              variant='outlined'
              required
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <TextField
              label='Password'
              variant='outlined'
              type='password'
              required
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
        </Box>
        <Button variant='contained' type='submit'>
          Log in
        </Button>
      </Box>
    </form>
  )
}

export default LoginForm
