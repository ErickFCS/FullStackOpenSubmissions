import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from './reducers/notifications'
import blogReducer from "./reducers/blogs";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer
    }
})

export default store