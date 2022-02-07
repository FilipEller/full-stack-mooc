import axios from 'axios'
const baseURL = 'http://localhost:3001/api/persons'

const create = (person) => {
  return axios.post(baseURL, person)
}

const readAll = () => {
  return axios.get(baseURL)
}

const update = (person) => {
  return axios.put(`${baseURL}/${person.id}`, person)
}

const deleteById = (id) => {
  return axios.delete(`${baseURL}/${id}`)
}

export default { create, readAll, update, deleteById }