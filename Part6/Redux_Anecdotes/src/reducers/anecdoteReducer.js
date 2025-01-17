import { createSlice } from '@reduxjs/toolkit'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        voteFor(state, action) {
            return state.map((e) => (e.id === action.payload.id ? { ...e, votes: e.votes + 1 } : e))
        },
        appendAnecdote(state, action) {
            return state.concat(action.payload)
        },
        appendAnecdotes(state, action) {
            state.push(...action.payload)
        }
    }
})

export const { voteFor, appendAnecdote, appendAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => (
    async (dispatch) => {
        return anecdotesService
            .fetchAll()
            .then((res) => {
                dispatch(appendAnecdotes(res))
            })
            .catch((err) => {
                console.error(err)
            })
    }
)

export const createNewAnecdote = (content) => (
    async (dispatch) => {
        return anecdotesService
            .createNew(content)
            .then((res) => {
                dispatch(appendAnecdote(res))
                dispatch(setNotification(`'${res.content}' was created`))
                setTimeout(() => {
                    dispatch(clearNotification())
                }, 5000)
            })
            .catch((err) => {
                dispatch(setNotification(`'${res.content}' wasn't created`))
                setTimeout(() => {
                    dispatch(clearNotification())
                }, 5000)
            })
    }
)

export default anecdoteSlice.reducer