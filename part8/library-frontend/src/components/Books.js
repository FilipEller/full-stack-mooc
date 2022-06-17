import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries.js'

const Books = props => {
  const [filter, setFilter] = useState('')

  const { data } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: filter },
  })

  if (!props.show) {
    return null
  }

  const books = data ? data.allBooks : []

  return (
    <div>
      <h2>Books</h2>

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
      {[...new Set(books.flatMap(b => b.genres))].map(g => (
        <button key={g} onClick={() => setFilter(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setFilter('')}>All genres</button>
    </div>
  )
}

export default Books
