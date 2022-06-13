import React, { useEffect, useRef } from 'react'

import blogService from './services/blogService'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserInfo from './components/UserInfo'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { Container, Typography, Paper } from '@mui/material'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, appendBlog } from './reducers/blogReducer'
import { initializeLoggedInUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'
import UserList from './components/UserList'

const App = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  // Get all blogs from backend
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeLoggedInUser())
  }, [dispatch])

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
      blogFormRef.current.toggleVisibility() // having to call this prevents createBlog from being moved to blogReducer
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
        {user ? <UserInfo /> : <LoginForm />}
      </Paper>
      <div>
        <Link to='/'>Blogs</Link>
        <Link to='/users'>Users</Link>
      </div>

      <Routes>
        <Route
          path='/'
          element={
            <>
              {user && (
                <>
                  <Togglable buttonLabel='Add a blog' ref={blogFormRef}>
                    <CreateBlogForm createBlog={createBlog} />
                  </Togglable>
                  <BlogList />
                </>
              )}
            </>
          }
        />
        <Route path='/users' element={<UserList />} />
      </Routes>
    </Container>
  )
}

export default App
