import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries.js'

const Books = ({ show, genres, filter, setFilter }) => {
  const { data, refetch } = useQuery(ALL_BOOKS, {
    variables: filter ? { genre: filter } : {},
    //skip: !show,
  })

  useEffect(() => {
    refetch()
  }, [filter]) // eslint-disable-line

  if (!show) {
    return null
  }

  const filteredBooks = data ? data.allBooks : []

  return (
    <div>
      <h2>Books</h2>
      {filter && (
        <p>
          In genre <b>{filter}</b>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(g => (
        <button key={g} onClick={() => setFilter(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setFilter('')}>All genres</button>
    </div>
  )
}

export default Books
