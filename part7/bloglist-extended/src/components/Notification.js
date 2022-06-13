import React from 'react'
import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const UserInfo = () => {
  const [message, isSuccess] = useSelector(state => [
    state.notification.message,
    state.notification.isSuccess,
  ])
  const severity = isSuccess ? 'success' : 'error'

  return (
    <>
      {message ? (
        <Alert severity={severity} sx={{ my: 3 }}>
          {message}
        </Alert>
      ) : (
        <></>
      )}
    </>
  )
}

export default UserInfo
