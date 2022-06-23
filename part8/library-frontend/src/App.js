import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommended from './components/Recommended'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED, ACCOUNT } from './queries.js'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState('')
  const [filter, setFilter] = useState('')
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

  const { data: accountData } = useQuery(ACCOUNT)
  const favouriteGenre =
    accountData && accountData.me ? accountData.me.favouriteGenre : null

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(filter)
      console.log(favouriteGenre)
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => ({
        allBooks: allBooks.concat(addedBook),
      }))
      client.cache.updateQuery(
        {
          query: ALL_BOOKS,
          variables: favouriteGenre ? { genre: favouriteGenre } : {},
        },
        ({ allBooks }) => ({
          allBooks: addedBook.genres.includes(favouriteGenre)
            ? allBooks.concat(addedBook)
            : allBooks,
        })
      )
      client.cache.updateQuery(
        { query: ALL_BOOKS, variables: filter ? { genre: filter } : {} },
        ({ allBooks }) => ({
          allBooks:
            addedBook.genres.includes(filter) && filter !== favouriteGenre
              ? allBooks.concat(addedBook)
              : allBooks,
        })
      )
      window.alert(`${addedBook.title} was added.`)
    },
  })

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

      <Books
        show={page === 'books'}
        genres={genres}
        filter={filter}
        setFilter={setFilter}
      />
      <Recommended
        show={page === 'recommended'}
        favouriteGenre={favouriteGenre}
      />

      <NewBook
        show={page === 'add'}
        filter={filter}
        favouriteGenre={favouriteGenre}
      />

      <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
