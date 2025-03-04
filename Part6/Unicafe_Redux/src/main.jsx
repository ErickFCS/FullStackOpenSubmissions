import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import ReactDOM from 'react-dom/client'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import { createStore, } from 'redux'
import reducer from './reducer'

const store = createStore(reducer,)

const App = () => {
    const good = () => {
        store.dispatch({
            type: 'GOOD',
        },)
    }
    const ok = () => {
        store.dispatch({
            type: 'OK',
        },)
    }
    const bad = () => {
        store.dispatch({
            type: 'BAD',
        },)
    }
    const reset = () => {
        store.dispatch({
            type: 'ZERO',
        },)
    }

    return (
        <Stack gap={3} style={{ marginTop: 30, marginBottom: 30, }}>
            <h1 style={{ textAlign: 'center', }}>Give feedback</h1>
            <Stack direction='horizontal' style={{ justifyContent: 'center', }}>
                <ButtonGroup style={{ width: '100%', maxWidth: 500, }}>
                    <Button text='good' onClick={good} variant='success'>Good</Button>
                    <Button text='neutral' onClick={ok} variant='secondary'>Neutral</Button>
                    <Button text='bad' onClick={bad} variant='danger'>Bad</Button>
                </ButtonGroup>
            </Stack>
            <Button text='reset' onClick={reset} variant='secondary'>Reset</Button>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h2>
                            statistics
                        </h2>
                    </Card.Title>
                    <Table size='sm' style={{ margin: 0, }}>
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Good: </td>
                                <td>{store.getState().good}</td>
                            </tr>
                            <tr>
                                <td>Neutral: </td>
                                <td>{store.getState().ok}</td>
                            </tr>
                            <tr>
                                <td>Bad: </td>
                                <td>{store.getState().bad}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Stack>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root',),)

const renderApp = () => {
    root.render(<App />,)
}

renderApp()
store.subscribe(renderApp,)
