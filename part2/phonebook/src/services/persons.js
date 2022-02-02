import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const create = (person) => {
  return axios.post(baseURL, person)
}

const readAll = () => {
  return axios.get(baseURL)
}

export default { create, readAll }