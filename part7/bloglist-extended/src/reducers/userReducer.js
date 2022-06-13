import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'
import loginService from '../services/loginService'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const initializeLoggedInUser = () => {
  return async dispatch => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const handleLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      dispatch(setUser(user))
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (err) {
      dispatch(setNotification('Incorrect username or password.', false, 5))
    }
  }
}

export const handleLogout = () => {
  return dispatch => {
    dispatch(removeUser())
    window.localStorage.removeItem('loggedInUser')
  }
}

export default userSlice.reducer
