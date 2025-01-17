import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        voteFor(state, action) {
            return state.map((e) => (e.id === action.payload.id ? { ...e, votes: e.votes + 1 } : e))
        },
        createAnecdote(state, action) {
            return state.concat(action.payload)
        },
appendAnecdotes(state, action) {
    state.push(...action.payload)
}
    }
})

export const { voteFor, createAnecdote, appendAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer