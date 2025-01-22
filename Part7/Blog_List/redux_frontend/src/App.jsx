import './index.css'
import { initializeBlogs, newBlog } from './reducers/blogs'
import { newNotification } from './reducers/notifications'
import { Routes, Route, useMatch } from 'react-router-dom'
import { setUser } from './reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import AccountForm from './components/AccountForm'
import Blogs from './components/Blogs'
import CreateForm from './components/CreateForm'
import Message from './components/Message'
import Toggle from './components/Toggle'
import Users from './components/Users'
import User from './components/User'
import userService from './services/userService'

const App = () => {
    const { message, error } = useSelector((state) => state.notification)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [users, setUsers] = useState([])
    const match = useMatch('/users/:id')

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

    const targetUser = match ? users.find((e) => e.id === match.params.id) : null
    return (
        <>
            <Message message={message} error={error} />
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
                                <Blogs />
                            </>
                        ) : null}
                    </>
                } />
                <Route path='/users' element={
                    <Users users={users} />
                } />
                <Route path='/users/:id' element={
                    <User user={targetUser} />
                } />
            </Routes>
        </>
    )
}

export default App
