import axios from 'axios'
const baseUrl = '/api/comments'

const create = async ({ content, blog }) => {
  const response = await axios.post(baseUrl, { content, blog: blog })
  return response.data
}

const blogService = { create }

export default blogService
