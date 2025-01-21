import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: { lastTimeOut: null, message: '', error: '' },
    reducers: {
        setMessage(state, action) {
            return { ...state, error: '', message: action.payload || '' }
        },
        setError(state, action) {
            return { ...state, message: '', error: action.payload || '' }
        },
        setLastTimeOut(state, action) {
            return { ...state, lastTimeOut: action.payload || null }
        },
        clearNotification(state, action) {
            return { lastTimeOut: null, message: '', error: '' }
        },
    },
})

export const { setMessage, setError, setLastTimeOut, clearNotification } =
    notificationSlice.actions

export const newNotification =
    (message, duration, isError = false) =>
    async (dispatch, getState) => {
        const lastTimeOut = getState().notification.lastTimeOut
        if (isError) dispatch(setError(message))
        else dispatch(setMessage(message))
        if (lastTimeOut) clearTimeout(lastTimeOut)
        const timeOut = setTimeout(() => {
            dispatch(clearNotification())
        }, duration * 1000)
        dispatch(setLastTimeOut(timeOut))
    }

export default notificationSlice.reducer
