import { useState } from 'react'

const Button = ({text, onClick}) => (
  <button onClick={onClick}>{text}</button>
)

const Total = ({text, value}) => (
  <p>{text}: {value}</p>
)

function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGood = () => {
    setGood(good + 1)
  }

  const onNeutral = () => {
    setNeutral(neutral + 1)
  }

  const onBad = () => {
    setBad(bad + 1)
  }

  return (
    <>
    <h1>give feedback</h1>
    <Button text="good" onClick={onGood}/>
    <Button text="neutral" onClick={onNeutral}/>
    <Button text="bad" onClick={onBad}/>
    <h2>statistics</h2>
    <Total text="good" value={good}/>
    <Total text="neutral" value={neutral}/>
    <Total text="bad" value={bad}/>
    </>
  )
}

export default App
