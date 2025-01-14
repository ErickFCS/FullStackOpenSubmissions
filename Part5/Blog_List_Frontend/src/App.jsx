import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Message from './components/Message'
import Toggle from './components/Toggle'
import AccountForm from './components/AccountForm'
import CreateForm from './components/CreateForm'
import BlogService from './services/blogsService'
import './index.css'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState({})
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        BlogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const savedUser = JSON.parse(window.localStorage.getItem('user')) || {}
        if (savedUser.name) setUser(savedUser)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setMessage(null)
            setError(null)
        }, 5000)
    }, [message, error])



    return (
        <div>
            <Message
                message={message}
                error={error} />
            <AccountForm
                setMessage={setMessage}
                setError={setError}
                user={user}
                setUser={setUser} />
            {user.name ?
                <>
                    <Toggle
                        showButtonText='create new blog'
                        hideButtonText='cancel'>
                        <CreateForm
                            user={user}
                            blogs={blogs}
                            setBlogs={setBlogs}
                            setMessage={setMessage}
                            setError={setError} />
                    </Toggle>
                    <Blogs
                        blogs={blogs}
                        user={user}
                        setBlogs={setBlogs}
                        setMessage={setMessage}
                        setError={setError} />
                </>
                : null}
        </div>
    )
}

export default App