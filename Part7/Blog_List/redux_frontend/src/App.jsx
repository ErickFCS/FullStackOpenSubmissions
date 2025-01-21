import './index.css'
import { initializeBlogs, newBlog } from './reducers/blogs'
import { newNotification } from './reducers/notifications'
import { setUser } from './reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import AccountForm from './components/AccountForm'
import Blogs from './components/Blogs'
import CreateForm from './components/CreateForm'
import Message from './components/Message'
import Toggle from './components/Toggle'

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
        <div>
            <Message message={message} error={error} />
            <AccountForm />
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
        </div>
    )
}

export default App
