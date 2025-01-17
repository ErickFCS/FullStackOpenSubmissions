import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createHandler = (event) => {
        event.preventDefault()
        anecdotesService
            .createNew(event.target.content.value)
            .then((res) => {
                dispatch(createAnecdote(res))
                dispatch(setNotification(`'${res.content}' was created`))
                setTimeout(() => {
                    dispatch(clearNotification())
                }, 5000)
            })
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