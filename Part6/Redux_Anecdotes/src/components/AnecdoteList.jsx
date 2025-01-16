import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
    const { id, content, votes } = anecdote
    const dispatch = useDispatch()
    const vote = (id) => {
        dispatch(voteFor(id))
    }
    return (
        <div>
            <div>
                {content}
            </div>
            <div>
                has {votes}
                <button onClick={() => vote(id)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state).sort((a, b) => (b.votes - a.votes))
    return (
        <>
            {anecdotes.map(anecdote =>
                <Anecdote anecdote={anecdote} key={anecdote.id} />
            )}
        </>
    )
}

export default AnecdoteList;