import React, { useState } from 'react'

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>
    {text}
  </button>
}

const Buttons = ({ onGoodClick, onNeutralClick, onBadClick }) => {
  return (
    <div>
      <Button onClick={onGoodClick} text="good" />
      <Button onClick={onNeutralClick} text="neutral" />
      <Button onClick={onBadClick} text="bad" />
    </div>
  )
};

const StatisticLine = ({ text, stat }) => {
  return (
    <tr>
      <td>{text}</td><td>{stat}</td>
    </tr>
  )
}

const Statistics = ({ stats }) => {
  return (
    <table>
      <tbody>
        {stats.map((s, index) =>
          <StatisticLine key={index} text={s.name} stat={s.stat} />
        )}
      </tbody>
    </table >
  )
};


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100 + ' %'

  const stats = [
    {
      name: 'good',
      stat: good
    },
    {
      name: 'neutral',
      stat: neutral
    },
    {
      name: 'bad',
      stat: bad
    },
    {
      name: 'all',
      stat: all
    },
    {
      name: 'average',
      stat: average
    },
    {
      name: 'positive',
      stat: positive
    }
  ]

  const onGoodClick = () => {
    setGood(good + 1)
  }

  const onNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const onBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Buttons
        onGoodClick={onGoodClick}
        onNeutralClick={onNeutralClick}
        onBadClick={onBadClick}
      />
      <h2>Statistics</h2>
      {all ? (
        <Statistics stats={stats} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  )
}

export default App