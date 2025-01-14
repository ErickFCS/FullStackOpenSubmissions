import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Message from './components/Message'
import Toggle from './components/Toggle'
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
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        BlogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const savedUser = JSON.parse(window.localStorage.getItem("user")) || {}
        if (savedUser.name) setUser(savedUser)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setMessage(null)
            setError(null)
        }, 5000);
    }, [message, error])

    const loginHandler = (event) => {
        event.preventDefault()
        AccountService
            .login(username, password)
            .then((newUser) => {
                setUser(newUser)
                window.localStorage.setItem("user", JSON.stringify(newUser))
                setMessage("login successful")
                setUsername("")
                setPassword("")
            })
            .catch((err) => {
                setError("login unsuccessful")
            })
    }

    const logoutHandler = () => {
        setUser({})
        window.localStorage.removeItem("user")
        setMessage("logout successful")
    }

    const createHandler = (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value
        BlogService
            .createBlog({ title, author, url }, user)
            .then((createdBlog) => {
                setMessage("blog creating successed")
                const newBlogs = blogs.concat(createdBlog)
                setBlogs(newBlogs)
                event.target.title.value = ""
                event.target.author.value = ""
                event.target.url.value = ""
            })
            .catch((err) => {
                setError("blog creating failed")
            })

    }
    return (
        <div>
            <Message message={message} error={error} />
            <AccountForm user={user} loginHandler={loginHandler} logoutHandler={logoutHandler} inputStates={{ setPassword, setUsername }} />
            {user.name ?
                <>
                    <Toggle showButtonText="create new blog" hideButtonText="cancel">
                        <CreateForm createHandler={createHandler} />
                    </Toggle>
                    <Blogs blogs={blogs} user={user} setBlogs={setBlogs} />
                </>
                : null}
        </div>
    )
}

export default App