import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries.js'

const Authors = props => {
  const { loading, data } = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {loading ? (
            <tr>
              <td>loading...</td>
              <td></td>
              <td></td>
            </tr>
          ) : (
            data.allAuthors.map(a => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
