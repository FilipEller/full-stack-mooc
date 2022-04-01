import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import { Container, Typography } from '@mui/material'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  const handleLogin = async (username, password) => {
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
    } catch (err) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h1' gutterBottom component='div'>
        Blogs
      </Typography>
      {!user && <LoginForm handleLogin={handleLogin} />}
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </Container>
  )
}

export default App
