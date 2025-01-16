import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createHandler = (event) => {
        event.preventDefault()
        dispatch(createAnecdote(event.target.content.value))
        dispatch(setNotification(`'${event.target.content.value}' was created`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
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