import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Message from './components/Message'
import Toggle from './components/Toggle'
import AccountForm from './components/AccountForm'
import CreateForm from './components/CreateForm'
import BlogService from './services/blogsService'
import './index.css'
import { useContext } from 'react'
import notificationContext from './context/notifications'
import { setNotification, clearNotification } from './context/notifications'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState({})
    const [notification, notificationDispatch] = useContext(notificationContext)

    useEffect(() => {
        BlogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const savedUser = JSON.parse(window.localStorage.getItem('user')) || {}
        if (savedUser.name) setUser(savedUser)
    }, [])

    const createHandler = (title, author, url) => {
        return BlogService.createBlog({ title, author, url }, user)
            .then((createdBlog) => {
                if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
                const timeOut = setTimeout(() => {
                    notificationDispatch(clearNotification())
                }, 5000);
                notificationDispatch(setNotification({ message: 'blog creating successed', lastTimeOut: timeOut }))
                createdBlog.User = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                }
                const newBlogs = blogs.concat(createdBlog)
                setBlogs(newBlogs)
            })
            .catch((err) => {
                if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
                const timeOut = setTimeout(() => {
                    notificationDispatch(clearNotification())
                }, 5000);
                notificationDispatch(setNotification({ error: 'blog creating failed', lastTimeOut: timeOut }))
                return Promise.reject(err)
            })
    }

    return (
        <div>
            <Message message={notification.message} error={notification.error} />
            <AccountForm
                user={user}
                setUser={setUser}
            />
            {user.name ? (
                <>
                    <Toggle
                        showButtonText='create new blog'
                        hideButtonText='cancel'>
                        <CreateForm createHandler={createHandler} />
                    </Toggle>
                    <Blogs
                        blogs={blogs}
                        user={user}
                        setBlogs={setBlogs}
                    />
                </>
            ) : null}
        </div>
    )
}

export default App
