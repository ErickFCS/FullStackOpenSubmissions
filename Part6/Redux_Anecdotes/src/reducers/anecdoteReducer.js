import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        voteFor(state, action) {
            return state.map((e) => (e.id === action.payload.id ? { ...e, votes: e.votes + 1 } : e))
        },
        createAnecdote(state, action) {
            return state.concat(asObject(action.payload))
        },
        appendAnecdotes(state, action) {
            state.push(...action.payload)
        }
    }
})

export const { voteFor, createAnecdote, appendAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer