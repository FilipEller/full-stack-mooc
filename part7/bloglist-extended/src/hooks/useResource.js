import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = baseUrl => {
  const [resources, setResources] = useState([])
  const [token, _setToken] = useState('')

  useEffect(() => {
    const readAll = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    readAll()
  }, [baseUrl])

  const create = async resource => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, resource, config)
    setResources(resources.concat(response.data))
    return response.data
  }

  const setToken = newToken => {
    _setToken(`bearer ${newToken}`)
  }

  const service = {
    create,
    setToken,
  }

  return [resources, service]
}

export default useResource
