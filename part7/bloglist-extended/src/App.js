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
import { initializeBlogs, appendBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [user, setUser] = useState(null)
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()
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

  const createBlog = async ({ title, author, url }) => {
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
      blogFormRef.current.toggleVisibility()
      return newBlog
    } catch (err) {
      dispatch(setNotification('Adding blog failed.', false, 5))
      return null
    }
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
            <CreateBlogForm createBlog={createBlog} />
          </Togglable>
          <BlogList blogs={blogs} user={user} />
        </>
      )}
    </Container>
  )
}

export default App
