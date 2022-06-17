import { useQuery } from '@apollo/client'
import { ALL_BOOKS_AND_ME } from '../queries.js'

const Recommended = props => {
  const { loading, data } = useQuery(ALL_BOOKS_AND_ME)

  if (!props.show) {
    return null
  }

  const filter = !loading ? data.me.favouriteGenre : ''
  const books = !loading ? data.allBooks : []

  const booksToShow = filter
    ? books.filter(b => b.genres.includes(filter))
    : books

  return (
    <div>
      <h2>Recommendation</h2>
      <p>
        Books in your favourite genre <b>{filter}</b>
      </p>
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
    </div>
  )
}

export default Recommended
