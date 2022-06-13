import React from 'react'
import { Button, Box, Toolbar, AppBar } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogout } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <AppBar position='static'>
      <Box sx={{ width: '600px', mx: 'auto' }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Button color='inherit' component={Link} to='/'>
            Home
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            Users
          </Button>
          <Box component='em' sx={{ fontFamily: 'Roboto' }}>
            {user.name} is logged in.
          </Box>
          <Button variant='contained' onClick={() => dispatch(handleLogout())}>
            Log out
          </Button>
        </Toolbar>
      </Box>
    </AppBar>
  )
}

export default Navbar
