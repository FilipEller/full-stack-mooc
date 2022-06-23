import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries.js'

const Recommended = ({ show, favouriteGenre }) => {
  const { data, refetch } = useQuery(ALL_BOOKS, {
    variables: favouriteGenre ? { genre: favouriteGenre } : {},
  })

  useEffect(() => {
    refetch()
  }, [favouriteGenre]) // eslint-disable-line

  const books = data ? data.allBooks : []

  /*const booksToShow = filter
    ? books.filter(b => b.genres.includes(filter))
    : books*/

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favourite genre <b>{favouriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
