import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'
import commentService from '../services/commentService'
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
      return state.map(blog =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
  },
})

export const { appendBlog, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
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

export const deleteBlog = ({ id, title, author }) => {
  return async dispatch => {
    if (window.confirm(`Do you want to delete ${title} by ${author}?`)) {
      try {
        await blogService.remove(id)
        dispatch(removeBlog(id))
        dispatch(setNotification(`Blog ${title} deleted.`, true, 5))
      } catch (err) {
        dispatch(setNotification('Deleting blog failed.', false, 5))
      }
    }
  }
}

export const commentOnBlog = ({ content, blog }) => {
  return async dispatch => {
    try {
      const newComment = await commentService.create({ content, blog: blog.id })
      dispatch(
        updateBlog({ ...blog, comments: blog.comments.concat(newComment) })
      )
      dispatch(setNotification(`You commented '${content}'`, true, 5))
    } catch (err) {
      dispatch(setNotification('Commenting failed.', false, 5))
    }
  }
}

export default blogSlice.reducer
