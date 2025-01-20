import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Message from './components/Message'
import Toggle from './components/Toggle'
import AccountForm from './components/AccountForm'
import CreateForm from './components/CreateForm'
import BlogService from './services/blogsService'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { newNotification } from './reducers/notifications'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState({})
    const dispatch = useDispatch()
    const { message, error } = useSelector(state => state.notification)

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
                console.log("starting notification")
                dispatch(newNotification('blog creating successed', 5))
                createdBlog.User = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                }
                const newBlogs = blogs.concat(createdBlog)
                setBlogs(newBlogs)
            })
            .catch((err) => {
                dispatch(newNotification('blog creating failed', 5, true))
                return Promise.reject(err)
            })
    }

    return (
        <div>
            <Message message={message} error={error} />
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
