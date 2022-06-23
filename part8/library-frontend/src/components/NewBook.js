import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, ADD_BOOK } from '../queries.js'

const NewBook = ({ show, filter, favouriteGenre }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('2022')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: error => {
      console.log(error.graphQLErrors)
    },
    /*update: (cache, response) => {
      const addedBook = response.data.addBook

      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
      cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: filter } },
        ({ allBooks }) => {
          return {
            allBooks: addedBook.genres.includes(filter)
              ? allBooks.concat(addedBook)
              : allBooks,
          }
        }
      )
      cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: favouriteGenre } },
        ({ allBooks }) => {
          return {
            allBooks: addedBook.genres.includes(favouriteGenre)
              ? allBooks.concat(addedBook)
              : allBooks,
          }
        }
      )
    },*/
  })

  if (!show) {
    return null
  }

  const submit = async event => {
    event.preventDefault()

    createBook({
      variables: { title, author, published: parseInt(published), genres },
    })

    setTitle('')
    setPublished('2022')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>Add a book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
