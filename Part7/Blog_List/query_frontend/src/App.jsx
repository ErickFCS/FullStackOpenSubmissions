import { useEffect } from 'react'
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
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import userContext from './context/user'
import { setUser } from './context/user'

const App = () => {
    const [user, userDispatch] = useContext(userContext)
    const [notification, notificationDispatch] = useContext(notificationContext)

    useEffect(() => {
        const savedUser = JSON.parse(window.localStorage.getItem('user')) || {}
        if (savedUser.name) userDispatch(setUser(savedUser))
    }, [])

    const result = useQuery({
        initialData: [],
        queryKey: ['blogs'],
        queryFn: BlogService.getAll,
        retry: 3,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
    })

    const queryClient = useQueryClient()
    const blogsMutation = useMutation({
        mutationKey: ['blogs'],
        mutationFn: BlogService.createBlog,
        onSuccess: (createdBlog) => {
            if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
            const timeOut = setTimeout(() => {
                notificationDispatch(clearNotification())
            }, 5000)
            notificationDispatch(
                setNotification({
                    message: 'blog creating successed',
                    lastTimeOut: timeOut,
                })
            )
            createdBlog.User = {
                id: user.id,
                name: user.name,
                username: user.username,
            }
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.concat(createdBlog))
        },
        onError: (err) => {
            if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
            const timeOut = setTimeout(() => {
                notificationDispatch(clearNotification())
            }, 5000)
            console.error(err)
            notificationDispatch(
                setNotification({
                    error: 'blog creating failed',
                    lastTimeOut: timeOut,
                })
            )
            return Promise.reject(err)
        },
    })

    const createHandler = (title, author, url) => {
        return blogsMutation.mutateAsync({ blog: { title, author, url }, user })
    }

    if (result.isFetching) return <div>...Loadiing</div>
    if (result.error) return <div>Unable to reach server</div>
    const blogs = result.data
    return (
        <div>
            <Message
                message={notification.message}
                error={notification.error}
            />
            <AccountForm />
            {user.name ? (
                <>
                    <Toggle
                        showButtonText='create new blog'
                        hideButtonText='cancel'>
                        <CreateForm createHandler={createHandler} />
                    </Toggle>
                    <Blogs blogs={blogs} user={user} />
                </>
            ) : null}
        </div>
    )
}

export default App
