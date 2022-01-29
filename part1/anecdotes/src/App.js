import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const [selected, setSelected] = useState(0)

  const selectRandom = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const vote = () => {
    const newVotes = votes.slice()
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const mostVotedAnecdote = anecdotes[votes.indexOf(Math.max(...votes))]

  return (
    <>
      <div>
        <h2>Anecdote of the Day</h2>
        <p>{anecdotes[selected]}</p>
        <p>{votes[selected]} votes</p>
      </div>
      <div>
        <button onClick={vote}>Vote</button>
        <button onClick={selectRandom}>Next</button>
      </div>
      <div>
        <h2>Anecdote with the most votes</h2>
        <p>{mostVotedAnecdote}</p>
      </div>
    </>
  )
}

export default App