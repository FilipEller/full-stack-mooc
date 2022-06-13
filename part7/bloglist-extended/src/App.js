import React, { useEffect, useRef } from 'react'
import blogService from './services/blogService'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Navbar from './components/Navbar'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { Container, Typography, Paper } from '@mui/material'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, appendBlog } from './reducers/blogReducer'
import { initializeLoggedInUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from './reducers/usersReducer'
import { Routes, Route } from 'react-router-dom'
import UserList from './components/UserList'
import UserView from './components/UserView'
import BlogView from './components/BlogView'

const App = () => {
  const [user, blogs] = useSelector(state => [state.user, state.blogs])

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  // Get all blogs from backend
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeLoggedInUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch, blogs])

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
    <div>
      {user && <Navbar />}
      <Container maxWidth='sm'>
        <Typography variant='h1' gutterBottom component='h1'>
          Blogs
        </Typography>
        <Notification />
        {user ? (
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
            <Route path='/users/:id' element={<UserView />} />
            <Route path='/blogs/:id' element={<BlogView />} />
          </Routes>
        ) : (
          <Paper
            elevation={2}
            sx={{
              p: 3,
            }}>
            <LoginForm />
          </Paper>
        )}
      </Container>
    </div>
  )
}

export default App
