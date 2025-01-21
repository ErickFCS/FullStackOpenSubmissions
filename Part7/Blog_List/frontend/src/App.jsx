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
import { initializeBlogs, newBlog } from './reducers/blogs'

const App = () => {
    const [user, setUser] = useState({})
    const dispatch = useDispatch()
    const { message, error } = useSelector(state => state.notification)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    useEffect(() => {
        const savedUser = JSON.parse(window.localStorage.getItem('user')) || {}
        if (savedUser.name) setUser(savedUser)
    }, [])

    const createHandler = (title, author, url) => {
        return dispatch(newBlog(title, author, url, user))
            .then(() => {
                dispatch(newNotification('blog creating successed', 5))
            })
            .catch((err) => {
                console.error(err)
                dispatch(newNotification('blog creating failed', 5, true))
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
                        user={user}
                    />
                </>
            ) : null}
        </div>
    )
}

export default App
