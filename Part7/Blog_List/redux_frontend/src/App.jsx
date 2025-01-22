import './index.css'
import { initializeBlogs, newBlog } from './reducers/blogs'
import { newNotification } from './reducers/notifications'
import { Routes, Route, useMatch, Link } from 'react-router-dom'
import { setUser } from './reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import AccountForm from './components/AccountForm'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import CreateForm from './components/CreateForm'
import Message from './components/Message'
import Toggle from './components/Toggle'
import User from './components/User'
import Users from './components/Users'
import userService from './services/userService'

const App = () => {
    const [users, setUsers] = useState([])
    const { message, error } = useSelector((state) => state.notification)
    const blogs = useSelector((state) => state.blogs)
    const dispatch = useDispatch()
    const matchBlogId = useMatch('/blogs/:id')
    const matchUserId = useMatch('/users/:id')
    const user = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(initializeBlogs())
        const savedUser = JSON.parse(window.localStorage.getItem('user')) || {}
        if (savedUser.name) dispatch(setUser(savedUser))
        userService
            .fetchAll()
            .then((res) => {
                setUsers(res)
            })
            .catch((err) => { })
    }, [])

    const createHandler = (title, author, url) => (
        dispatch(newBlog(title, author, url, user))
            .then(() => {
                dispatch(newNotification('blog creating successed', 5))
            })
            .catch((err) => {
                console.error(err)
                dispatch(newNotification('blog creating failed', 5, true))
            })
    )
    const targetUser = matchUserId ? users.find((e) => e.id === matchUserId.params.id) : null
    const targetBlog = matchBlogId ? blogs.find((e) => e.id === matchBlogId.params.id) : null
    return (
        <>
            <Message message={message} error={error} />
            {user.name ?
                <div>
                    <Link to='/'>blogs</Link>
                    <Link to='/users'>users</Link>
                </div>
                : null
            }
            <AccountForm />
            <Routes>
                <Route path='/' element={
                    <>
                        {user.name ? (
                            <>
                                <Toggle
                                    showButtonText='create new blog'
                                    hideButtonText='cancel'>
                                    <CreateForm createHandler={createHandler} />
                                </Toggle>
                                <Blogs blogs={blogs} />
                            </>
                        ) : null}
                    </>
                } />
                <Route path='/blogs/:id' element={
                    <Blog blog={targetBlog} />
                } />
                <Route path='/users' element={
                    <Users users={users} />
                } />
                <Route path='/users/:id' element={
                    <User user={targetUser} />
                } />
                <Route path='*' element={<div>Unknown route</div>} />
            </Routes>
        </>
    )
}

export default App
