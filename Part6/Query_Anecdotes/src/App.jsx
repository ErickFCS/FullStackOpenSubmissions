import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdotesServices from './services/anecdotes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const App = () => {

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: anecdotesServices.fetchAll,
        retry: 0,
        refetchOnWindowFocus: false
    })

    const anecdotes = result.data

    const queryClient = useQueryClient()
    const anecdotesMutation = useMutation({
        mutationFn: anecdotesServices.updateAnecdote,
        onSuccess: (res) => {
            queryClient.setQueryData(['anecdotes'], anecdotes.map((e) => (e.id === res.id ? { ...e, votes: e.votes + 1 } : e)))
        }
    })

    const handleVote = (anecdote) => {
        anecdotesMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    }

    if (result.isLoading) {
        return (
            <div>loading data ...</div>
        )
    } else if (result.error) {
        return (
            <div>anecdote sevice not available due to problems in the server</div>
        )
    }

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
