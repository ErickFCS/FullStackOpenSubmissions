import { useState, } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import StyledButton from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

const Button = ({ text, onClick, style, variant, },) => (
    <StyledButton onClick={onClick} style={style} variant={variant}>{text}</StyledButton>
)

const StatisticsLine = ({ text, value, },) => (
    <>
        <tr>
            <td>{text}</td>
            <td>{value.toFixed(2,)}</td>
        </tr>
    </>
)

const StatisticsLinePercentage = ({ text, value, },) => (
    <>
        <tr>
            <td>{text}</td>
            <td>{value.toFixed(2,)}%</td>
        </tr>
    </>
)

const Statistics = ({ stats, },) => {

    const { good, neutral, bad, all, average, positive, } = stats

    if (!all) {
        return (
            <Card.Text>No feedback given</Card.Text>
        )
    }

    return (
        <>
            <Table size='sm' style={{ margin: 0 }}>
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <StatisticsLine text='good' value={good} />
                    <StatisticsLine text='neutral' value={neutral} />
                    <StatisticsLine text='bad' value={bad} />
                    <StatisticsLine text='all' value={all} />
                    <StatisticsLine text='average' value={average} />
                    <StatisticsLinePercentage text='positive' value={positive} />
                </tbody>
            </Table>
        </>
    )
}

function App() {

    const [good, setGood,] = useState(0,)
    const [neutral, setNeutral,] = useState(0,)
    const [bad, setBad,] = useState(0,)
    const [all, setAll,] = useState(0,)
    const [average, setAverage,] = useState(0,)
    const [positive, setPositive,] = useState(0,)

    const stats = {
        good: good,
        neutral: neutral,
        bad: bad,
        all: all,
        average: average,
        positive: positive,
    }

    const onGood = () => {
        setAverage((good + 1 - bad) / (all + 1),)
        setPositive((good + 1) / (all + 1) * 100,)
        setAll(all + 1,)
        setGood(good + 1,)
    }

    const onNeutral = () => {
        setAverage((good - bad) / (all + 1),)
        setPositive((good) / (all + 1) * 100,)
        setAll(all + 1,)
        setNeutral(neutral + 1,)
    }

    const onBad = () => {
        setAverage((good - (bad + 1)) / (all + 1),)
        setPositive((good) / (all + 1) * 100,)
        setAll(all + 1,)
        setBad(bad + 1,)
    }

    return (
        <Stack gap={3} style={{ marginTop: 30, marginBottom: 30, }}>
            <h1 style={{ textAlign: 'center', }}>Give feedback</h1>
            <Stack direction='horizontal' style={{ justifyContent: 'center', }}>
                <ButtonGroup style={{ width: '100%', maxWidth: 500, }}>
                    <Button text='good' onClick={onGood} variant='success' />
                    <Button text='neutral' onClick={onNeutral} variant='secondary' />
                    <Button text='bad' onClick={onBad} variant='danger' />
                </ButtonGroup>
            </Stack>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h2>
                            statistics
                        </h2>
                    </Card.Title>
                    <Statistics stats={stats} />
                </Card.Body>
            </Card>
        </Stack>
    )
}

export default App
