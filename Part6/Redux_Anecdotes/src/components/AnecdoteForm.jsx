import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createHandler = (event) => {
        event.preventDefault()
        dispatch(createNewAnecdote(event.target.content.value))
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createHandler}>
                <div><input name='content' type='text' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm