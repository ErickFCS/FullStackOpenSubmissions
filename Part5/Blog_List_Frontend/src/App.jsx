import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import AccountForm from './components/AccountForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    const loginHandler = async (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        const newUser = await loginService
            .login(username, password)
            .catch((err) => "")
        console.log(user)
        if (newUser) setUser(newUser)
    }

    return (
        <div>
            <AccountForm user={user} loginHandler={loginHandler} />
            <Blogs user={user} blogs={blogs} />
        </div>
    )
}

export default App