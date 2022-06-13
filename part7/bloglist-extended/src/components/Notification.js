import React from 'react'
import { Paper, Box } from '@mui/material'
import { useSelector } from 'react-redux'

const UserInfo = () => {
  const [message, isSuccess] = useSelector(state => [
    state.notification.message,
    state.notification.isSuccess,
  ])
  const backgroundColor = isSuccess ? '#adc178' : '#f07167'

  return (
    <>
      {message ? (
        <Paper
          elevation={2}
          sx={{
            px: 3,
            mb: 3,
            backgroundColor,
          }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Box component='span' sx={{ fontFamily: 'Roboto', my: 2 }}>
              {message}
            </Box>
          </Box>
        </Paper>
      ) : (
        <></>
      )}
    </>
  )
}

export default UserInfo
