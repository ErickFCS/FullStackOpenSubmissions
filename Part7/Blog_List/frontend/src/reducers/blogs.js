import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogsService'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            return state.concat(action.payload)
        },
        updateBlog(state, action) {
            const blog = action.payload
            return state.map((e) => e.id === blog.id ? blog : e)
        },
        deleteBlog(state, action) {
            const id = action.payload
            return state.filter((e) => e.id !== id)
        }
    }
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => (
    async (dispatch, getState) => {
        blogsService
            .getAll()
            .then((res) => {
                dispatch(setBlogs(res))
            })
            .catch((err) => {
                console.error(err)
            })
    }
)

export const newBlog = (title, author, url, user) => (
    async (dispatch, getState) => {
        return blogsService.createBlog({ title, author, url }, user)
            .then((createdBlog) => {
                createdBlog.User = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                }
                dispatch(appendBlog(createdBlog))
            })
            .catch((err) => {
                return Promise.reject(err)
            })
    }
)

export const giveLike = (blog, user) => (
    async (dispatch) => {
        return blogsService.giveLike(blog, user)
            .then((res) => {
                dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
            })
            .catch((err) => {
                console.error(err)
                return Promise.reject(err)
            })
    }
)

export const removeBlog = (blog, user) => (
    async (dispatch) => {
        return blogsService.deleteBlog(blog, user)
            .then((res) => {
                dispatch(deleteBlog(blog.id))
            })
            .catch((err) => {
                console.error(err)
                return Promise.reject(err)
            })
    }
)

export default blogSlice.reducer