import React from 'react'
import { Button, Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogout } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Paper } from '@mui/material'

const Navbar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Box component='span' sx={{ fontFamily: 'Roboto', my: 2 }}>
          <Link to='/'>Blogs</Link>
        </Box>
        <Box component='span' sx={{ fontFamily: 'Roboto', my: 2 }}>
          <Link to='/users'>Users</Link>
        </Box>
        <Box component='span' sx={{ fontFamily: 'Roboto', my: 2 }}>
          {user.name} is logged in.
        </Box>
        <Button variant='contained' onClick={() => dispatch(handleLogout())}>
          Log out
        </Button>
      </Box>
    </Paper>
  )
}

export default Navbar
