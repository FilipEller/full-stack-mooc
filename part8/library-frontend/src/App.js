import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommended from './components/Recommended'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_BOOKS } from './queries.js'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')
  const { data } = useQuery(ALL_BOOKS)

  const books = data ? data.allBooks : []
  const genres = [...new Set(books.flatMap(b => b.genres))]

  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const logOut = () => {
    setToken('')
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>

        {token ? (
          <>
            <button onClick={() => setPage('recommended')}>Recommended</button>
            <button onClick={() => setPage('add')}>Add a book</button>
            <button onClick={logOut}>Log out</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>Login</button>
        )}
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} genres={genres} />
      <Recommended show={page === 'recommended'} />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
