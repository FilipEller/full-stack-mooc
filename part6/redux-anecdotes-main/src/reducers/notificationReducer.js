import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', timeoutID: null },
  reducers: {
    setMessage(state, action) {
      return { ...state, message: action.payload }
    },
    removeMessage(state) {
      return { ...state, message: '' }
    },
    setTimeoutID(state, action) {
      return { ...state, timeoutID: action.payload }
    },
  },
})

export const { setMessage, removeMessage, setTimeoutID } =
  notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async (dispatch, getState) => {
    const {
      notification: { timeoutID: previous },
    } = getState()
    clearTimeout(previous)
    dispatch(setMessage(message))
    const timeoutID = setTimeout(() => {
      dispatch(removeMessage())
    }, seconds * 1000)
    dispatch(setTimeoutID(timeoutID))
  }
}

export default notificationSlice.reducer
