import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import AccountForm from './components/AccountForm'
import BlogService from './services/blogsService'
import AccountService from './services/accountService'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState({})

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
            .catch((err) => "")
        if (newUser.name) {
            setUser(newUser)
            window.localStorage.setItem("user", JSON.stringify(newUser))
        }
    }

    const logoutHandler = () => {
        setUser({})
        window.localStorage.removeItem("user")
    }

    return (
        <div>
            <AccountForm user={user} loginHandler={loginHandler} logoutHandler={logoutHandler} />
            <Blogs user={user} blogs={blogs} />
        </div>
    )
}

export default App