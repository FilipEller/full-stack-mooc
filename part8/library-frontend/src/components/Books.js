import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries.js'

const Books = props => {
  const { loading, data } = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('')

  if (!props.show) {
    return null
  }

  const books = !loading ? data.allBooks : []
  const booksToShow = filter
    ? books.filter(b => b.genres.includes(filter))
    : books

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
          {booksToShow.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {[...new Set(books.flatMap(b => b.genres))].map(g => (
        <button key={g} onClick={() => setFilter(g)}>{g}</button>
      ))}
      <button onClick={() => setFilter('')}>All genres</button>
    </div>
  )
}

export default Books
