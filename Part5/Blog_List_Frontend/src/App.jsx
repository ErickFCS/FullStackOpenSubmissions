import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Message from './components/Message'
import AccountForm from './components/AccountForm'
import CreateForm from './components/CreateForm'
import BlogService from './services/blogsService'
import AccountService from './services/accountService'
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
        const savedUser = JSON.parse(window.localStorage.getItem("user")) || {}
        if (savedUser.name) setUser(savedUser)
    }, [])

    const loginHandler = async (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        const newUser = await AccountService
            .login(username, password)
            .catch((err) => ({}))
        if (newUser.name) {
            setUser(newUser)
            window.localStorage.setItem("user", JSON.stringify(newUser))
            setMessage("login successful")
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        } else {
            setError("login unsuccessful")
            setTimeout(() => {
                setError(null)
            }, 3000)
        }
    }

    const logoutHandler = () => {
        setUser({})
        window.localStorage.removeItem("user")
        setMessage("logout successful")
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    const createHandler = async (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value
        const result = await BlogService
            .createBlog({ title, author, url }, user)
            .catch((err) => {
                setError("blog creating failed")
                setTimeout(() => {
                    setError(null)
                }, 3000)
                return null
            })
        if (!result) return
        event.target.title.value = ""
        event.target.author.value = ""
        event.target.url.value = ""
        BlogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
        setMessage("blog creating successed")
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    return (
        <div>
            <Message message={message} error={error} />
            <AccountForm user={user} loginHandler={loginHandler} logoutHandler={logoutHandler} />
            <CreateForm user={user} createHandler={createHandler} />
            <Blogs user={user} blogs={blogs} />
        </div>
    )
}

export default App