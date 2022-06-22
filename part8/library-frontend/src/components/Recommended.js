import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ACCOUNT, ALL_BOOKS } from '../queries.js'

const Recommended = ({ show }) => {
  const { data: accountData } = useQuery(ACCOUNT)

  const filter = accountData ? accountData.me.favouriteGenre : null

  const { data: booksData, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: accountData && accountData.me.favouriteGenre },
    skip: !accountData,
  })

  useEffect(() => {
    refetch()
  }, [show]) // eslint-disable-line

  const books = booksData ? booksData.allBooks : []

  /*const booksToShow = filter
    ? books.filter(b => b.genres.includes(filter))
    : books*/

  if (!show) {
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
