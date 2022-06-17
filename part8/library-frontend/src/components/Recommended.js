import { useQuery } from '@apollo/client'
import { ACCOUNT, BOOKS_BY_GENRE } from '../queries.js'

const Recommended = props => {
  const { data: accountData } = useQuery(ACCOUNT, {
    refetchQueries: [{ query: BOOKS_BY_GENRE }],
  })

  const filter = accountData ? accountData.me.favouriteGenre : null

  const { data: booksData } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: accountData && accountData.me.favouriteGenre },
    skip: !accountData,
  })

  const books = booksData ? booksData.allBooks : []

  /*const booksToShow = filter
    ? books.filter(b => b.genres.includes(filter))
    : books*/

  if (!props.show) {
    return null
  }

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
