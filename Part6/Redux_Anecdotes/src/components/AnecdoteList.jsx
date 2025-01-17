import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
    const { content, votes } = anecdote
    const dispatch = useDispatch()
    const vote = () => {
        dispatch(voteForAnecdote(anecdote))
    }
    return (
        <div>
            <div>
                {content}
            </div>
            <div>
                has {votes}
                <button onClick={() => vote()}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const regExp = new RegExp(filter, 'i')
    const anecdotes = useSelector(state => state.anecdotes)
        .filter((e) => (regExp.test(e.content)))
        .sort((a, b) => (b.votes - a.votes))

    return (
        <>
            {anecdotes.map(anecdote =>
                <Anecdote anecdote={anecdote} key={anecdote.id} />
            )}
        </>
    )
}

export default AnecdoteList