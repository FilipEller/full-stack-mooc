import React from 'react'
import { Button, Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogout } from '../reducers/userReducer'

const UserInfo = () => {
  const name = useSelector(state => state.user.name)
  const dispatch = useDispatch()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Box component='span' sx={{ fontFamily: 'Roboto', my: 2 }}>
        {name} is logged in.
      </Box>
      <Button variant='contained' onClick={() => dispatch(handleLogout())}>
        Log out
      </Button>
    </Box>
  )
}

export default UserInfo
