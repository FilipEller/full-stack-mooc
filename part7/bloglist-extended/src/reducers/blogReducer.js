import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      return state.map(anecdote =>
        anecdote.id === action.payload.id ? action.payload : anecdote
      )
    },
  },
})

export const { appendBlog, setBlogs, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = ({ title, author, url }) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create({ title, author, url })
      dispatch(appendBlog(newBlog))
      dispatch(
        setNotification(
          `New blog '${newBlog.title}' by ${newBlog.author} added`,
          true,
          5
        )
      )
      // blogFormRef.current.toggleVisibility()
      return newBlog
    } catch (err) {
      dispatch(setNotification('Adding blog failed.', false, 5))
      return null
    }
  }
}

export const likeBlog = ({ id, user, likes, author, title, url }) => {
  return async dispatch => {
    try {
      const blog = { user: user.id, likes: likes + 1, author, title, url }
      const newBlog = await blogService.update(id, blog)
      dispatch(updateBlog(newBlog))
      return newBlog
    } catch (err) {
      dispatch(setNotification('Liking blog failed.', false, 5))
      return null
    }
  }
}

export default blogSlice.reducer
