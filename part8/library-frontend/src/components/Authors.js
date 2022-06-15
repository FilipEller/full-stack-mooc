import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries.js'

const Authors = props => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const { loading, data } = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  const submit = event => {
    event.preventDefault()
    console.log('submitted')
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
      <h3>Set birth year</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default Authors
