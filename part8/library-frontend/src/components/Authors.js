import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries.js'

const Authors = ({ show, token }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('2000')

  const { loading, data } = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: error => {
      console.log(error.graphQLErrors[0].message)
    },
  })

  if (!show) {
    return null
  }

  const submit = event => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: parseInt(year) } })

    setName('')
    setYear('2000')
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
      {token && (
        <>
          <h3>Set birth year</h3>
          <form onSubmit={submit}>
            <div>
              Name:
              <select
                value={name}
                onChange={({ target }) => setName(target.value)}>
                <option value=''></option>
                {!loading ? (
                  data.allAuthors.map(a => (
                    <option key={a.id} value={a.name}>
                      {a.name}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </div>
            <div>
              Year:
              <input
                type='number'
                value={year}
                onChange={({ target }) => setYear(target.value)}
              />
            </div>
            <button type='submit'>Update author</button>
          </form>
        </>
      )}
    </div>
  )
}

export default Authors
