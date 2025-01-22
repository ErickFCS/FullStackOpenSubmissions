import './index.css'
import { initializeBlogs, newBlog } from './reducers/blogs'
import { newNotification } from './reducers/notifications'
import { Routes, Route, Link } from 'react-router-dom'
import { setUser } from './reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import AccountForm from './components/AccountForm'
import Blogs from './components/Blogs'
import CreateForm from './components/CreateForm'
import Message from './components/Message'
import Toggle from './components/Toggle'
import Users from './components/Users'

const App = () => {
    const { message, error } = useSelector((state) => state.notification)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(initializeBlogs())
        const savedUser = JSON.parse(window.localStorage.getItem('user')) || {}
        if (savedUser.name) dispatch(setUser(savedUser))
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
                    <Users />
                } />
            </Routes>
        </>
    )
}

export default App
