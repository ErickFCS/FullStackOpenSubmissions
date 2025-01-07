import { useState } from 'react'

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
)

const Total = ({ text, value }) => (
  <p>{text}: {value}</p>
)

const TotalPercentage = ({ text, value }) => (
  <p>{text}: {value}%</p>
)

const Statistics = ({stats}) => {
  
  const { good, neutral, bad, all, average, positive } = stats
  
  return (
    <>
      <h2>statistics</h2>
      <Total text="good" value={good} />
      <Total text="neutral" value={neutral} />
      <Total text="bad" value={bad} />
      <Total text="all" value={all} />
      <Total text="average" value={average} />
      <TotalPercentage text="positive" value={positive} />
    </>
  )
}

function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  
  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive,
  }

  const onGood = () => {
    setAverage((good + 1 - bad) / (all + 1))
    setPositive((good + 1) / (all + 1))
    setAll(all + 1)
    setGood(good + 1)
  }

  const onNeutral = () => {
    setAverage((good - bad) / (all + 1))
    setPositive((good) / (all + 1))
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  const onBad = () => {
    setAverage((good - (bad + 1)) / (all + 1))
    setPositive((good) / (all + 1))
    setAll(all + 1)
    setBad(bad + 1)
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" onClick={onGood} />
      <Button text="neutral" onClick={onNeutral} />
      <Button text="bad" onClick={onBad} />
      <Statistics stats={stats} />
    </>
  )
}

export default App
