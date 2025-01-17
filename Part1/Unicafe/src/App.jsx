import { useState } from 'react'

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticsLine = ({ text, value }) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </>
)

const StatisticsLinePercentage = ({ text, value }) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{value}%</td>
    </tr>
  </>
)

const Statistics = ({ stats }) => {

  const { good, neutral, bad, all, average, positive } = stats

  if (!all) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLinePercentage text="positive" value={positive} />
        </tbody>
      </table>
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
    setPositive((good + 1) / (all + 1) * 100)
    setAll(all + 1)
    setGood(good + 1)
  }

  const onNeutral = () => {
    setAverage((good - bad) / (all + 1))
    setPositive((good) / (all + 1) * 100)
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  const onBad = () => {
    setAverage((good - (bad + 1)) / (all + 1))
    setPositive((good) / (all + 1) * 100)
    setAll(all + 1)
    setBad(bad + 1)
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" onClick={onGood} />
      <Button text="neutral" onClick={onNeutral} />
      <Button text="bad" onClick={onBad} />
      <h2>statistics</h2>
      <Statistics stats={stats} />
    </>
  )
}

export default App
