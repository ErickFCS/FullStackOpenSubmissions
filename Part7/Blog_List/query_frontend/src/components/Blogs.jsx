import { setNotification, clearNotification } from '../context/notifications'
import { useContext } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import Blog from './Blog'
import BlogsService from '../services/blogsService'
import notificationContext from '../context/notifications'
import userContext from '../context/user'

const Blogs = ({ blogs }) => {
    const [notification, notificationDispatch] = useContext(notificationContext)
    const [user, userDispatch] = useContext(userContext)

    blogs.sort((a, b) => b.likes - a.likes)

    const queryClient = useQueryClient()
    const blogsMutation = useMutation({
        mutationKey: ['blogs'],
        mutationFn: BlogsService.giveLike,
        onSuccess: (res) => {
            let blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(
                ['blogs'],
                blogs.map((e) =>
                    e.id !== res.id ? e : { ...e, likes: e.likes + 1 }
                )
            )
            if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
            const timeOut = setTimeout(() => {
                notificationDispatch(clearNotification())
            }, 5000)
            notificationDispatch(
                setNotification({ message: 'Liked', lastTimeOut: timeOut })
            )
        },
        onError: (err) => {
            console.error(err)
            if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
            const timeOut = setTimeout(() => {
                notificationDispatch(clearNotification())
            }, 5000)
            notificationDispatch(
                setNotification({
                    error: 'Unable to like',
                    lastTimeOut: timeOut,
                })
            )
        },
    })
    const blogsDeleteMutation = useMutation({
        mutationKey: ['blogs'],
        mutationFn: BlogsService.deleteBlog,
        onSuccess: (res) => {
            const newBlogs = queryClient
                .getQueryData(['blogs'])
                .filter((e) => e.id !== res.id)
            queryClient.setQueryData(['blogs'], newBlogs)
            if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
            const timeOut = setTimeout(() => {
                notificationDispatch(clearNotification())
            }, 5000)
            notificationDispatch(
                setNotification({
                    message: `${res.title} removed`,
                    lastTimeOut: timeOut,
                })
            )
        },
        onError: (err) => {
            if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
            const timeOut = setTimeout(() => {
                notificationDispatch(clearNotification())
            }, 5000)
            notificationDispatch(
                setNotification({
                    error: `unable to remove ${err.title}`,
                    lastTimeOut: timeOut,
                })
            )
        },
    })

    const likesHandler = (blog) => { blogsMutation.mutate({ blog, user }) }

    const removeHandler = (blog) => {
        if (!window.confirm(`Are you sure yo want to remove ${blog.title}?`))
            return
        blogsDeleteMutation.mutate({ blog, user })
    }

    return (
        <>
            <h2>blogs</h2>
            {blogs.map((blog, index) => (
                <Blog
                    key={index}
                    blog={{ ...blog, index }}
                    likesHandler={likesHandler}
                    removeHandler={removeHandler}
                    user={user}
                />
            ))}
        </>
    )
}

export default Blogs
