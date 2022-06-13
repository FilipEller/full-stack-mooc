import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserView = () => {
  const match = useMatch('/users/:id')
  const users = useSelector(state => state.users)
  const user = match ? users.find(user => user.id === match.params.id) : null

  if (!user) {
    return
  }

  return (
    <>
      <h2>{user.name}</h2>
      <div>{user.username}</div>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default UserView
