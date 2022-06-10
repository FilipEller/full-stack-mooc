import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    removeMessage() {
      return ''
    },
  },
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(removeMessage())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
