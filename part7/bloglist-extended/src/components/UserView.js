import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

const UserView = () => {
  const match = useMatch('/users/:id')
  const users = useSelector(state => state.users)
  const user = match ? users.find(user => user.id === match.params.id) : null

  if (!user) {
    return
  }

  return (
    <>
      <Typography variant='h4' gutterBottom component='h4'>
        {user.name}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant='h6' gutterBottom component='h6'>
                Added blogs
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.blogs.map(blog => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default UserView
