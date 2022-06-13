import React, { useState, useEffect, useRef } from 'react'

import blogService from './services/blogService'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserInfo from './components/UserInfo'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { Container, Typography, Paper } from '@mui/material'
import loginService from './services/loginService'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, setBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()

  // Get all blogs from backend
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (err) {
      dispatch(setNotification('Incorrect username or password.', false, 5))
    }
  }

  const handleLogout = () => {
    console.log('logging out')
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const deleteBlog = async ({ id, title, author }) => {
    if (window.confirm(`Do you want to delete ${title} by ${author}?`)) {
      try {
        const response = await blogService.remove(id)
        dispatch(setBlogs(blogs.filter(b => b.id !== id)))
        dispatch(setNotification(`Blog ${title} deleted.`, true, 5))
        return response.data
      } catch (err) {
        dispatch(setNotification('Deleting blog failed.', false, 5))
      }
    }
    return null
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h1' gutterBottom component='div'>
        Blogs
      </Typography>
      <Notification />
      <Paper
        elevation={2}
        sx={{
          p: 3,
        }}>
        {user ? (
          <UserInfo name={user.name} handleLogout={handleLogout} />
        ) : (
          <LoginForm handleLogin={handleLogin} />
        )}
      </Paper>
      {user && (
        <>
          <Togglable buttonLabel='Add a blog' ref={blogFormRef}>
            <CreateBlogForm />
          </Togglable>
          <BlogList
            blogs={blogs}
            user={user}
            deleteBlog={deleteBlog}
          />
        </>
      )}
    </Container>
  )
}

export default App
