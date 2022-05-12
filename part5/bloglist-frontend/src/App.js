import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserInfo from './components/UserInfo'
import { Container, Typography, Box } from '@mui/material'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
    }
  }, [])

  const handleLogin = async (username, password) => {
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (err) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log('logging out')
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const addBlog = ({ title, author, url }) => {
    console.log('adding blog')
    const blogToCreate = { title, author, url }
    blogService.create(blogToCreate)
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h1' gutterBottom component='div'>
        Blogs
      </Typography>
      <Box
        sx={{
          p: 2,
          border: '1px solid',
          borderWidth: '2px',
          borderRadius: '5px',
        }}>
        {user ? (
          <UserInfo name={user.name} handleLogout={handleLogout} />
        ) : (
          <LoginForm handleLogin={handleLogin} />
        )}
      </Box>
      {user && <BlogList blogs={blogs} />}
    </Container>
  )
}

export default App
