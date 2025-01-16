const initialState = ''

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE":
            return action.payload.value
        case "CLEAR":
            return ''
        default:
            return state
    }
}

export const changeFilter = (value) => {
    return {
        type: "CHANGE",
        payload: {
            value
        }
    }
}

export const clearFilter = () => {
    return {
        type: "CLEAR",
    }
}

export default filterReducer