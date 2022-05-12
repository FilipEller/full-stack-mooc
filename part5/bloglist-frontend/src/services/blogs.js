import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async ({ title, author, url }) => {
  const response = await axios.post(baseUrl, { title, author, url })
  return response.data
}

const blogService = { getAll }

export default blogService
