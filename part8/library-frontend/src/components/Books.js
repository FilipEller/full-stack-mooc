import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries.js'

const Books = props => {
  const { loading, data } = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  const books = !loading ? data.allBooks : []

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
          {books.map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
