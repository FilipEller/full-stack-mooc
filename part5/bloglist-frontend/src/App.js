import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserInfo from './components/UserInfo'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { Container, Typography, Paper } from '@mui/material'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)

  // Get all blogs from backend
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

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
      setMessage('Wrong credentials')
      setSuccess(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
      setBlogs(blogs.concat(newBlog))
      setMessage(`New blog '${newBlog.title}' by ${newBlog.author} added`)
      setSuccess(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return newBlog
    } catch (err) {
      setMessage('Failed adding blog')
      setSuccess(false)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      return null
    }
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h1' gutterBottom component='div'>
        Blogs
      </Typography>
      {message && <Notification message={message} success={success} />}
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
          <Togglable buttonLabel='Add a blog'>
            <CreateBlogForm createBlog={createBlog} />
          </Togglable>
          <BlogList blogs={blogs} />
        </>
      )}
    </Container>
  )
}

export default App
