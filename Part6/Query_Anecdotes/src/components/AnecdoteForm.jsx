import { useMutation, useQueryClient } from "@tanstack/react-query"
import anecdoteService from '../services/anecdotes'
import notificationContext from '../contexts/notifications'
import { setNotification, clearNotification } from '../contexts/notifications'
import { useContext } from 'react'

const AnecdoteForm = () => {

    const [notification, notificationDispatch] = useContext(notificationContext)

    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation({
        mutationFn: anecdoteService.createNew,
        onSuccess: (res) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(res))
            notificationDispatch(setNotification(`${res.content} was created`))
            setTimeout(() => {
                notificationDispatch(clearNotification())
            }, 5000)
        },
        onError: (err) => {
            notificationDispatch(setNotification(`${res.content} wasn't created`))
            setTimeout(() => {
                notificationDispatch(clearNotification())
            }, 5000)
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        newAnecdoteMutation.mutate(content)
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
