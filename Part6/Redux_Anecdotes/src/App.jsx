import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from './reducers/anecdoteReducer'
import { createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
    const anecdotes = useSelector(state => state).sort((a, b) => (b.votes - a.votes))
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteFor(id))
    }

    const createHandler = (event) => {
        event.preventDefault()
        dispatch(createAnecdote(event.target.content.value))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
            <h2>create new</h2>
            <form onSubmit={createHandler}>
                <div><input name='content' type='text' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default App