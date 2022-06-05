import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = event => {
    console.log('adding')
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`You added ${content}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='content' />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
