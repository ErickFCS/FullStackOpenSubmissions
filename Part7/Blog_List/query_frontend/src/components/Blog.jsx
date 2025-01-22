import { setNotification, clearNotification } from '../context/notifications'
import { useContext } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import BlogsService from '../services/blogsService'
import notificationContext from '../context/notifications'
import userContext from '../context/user'

const Blog = ({ blog }) => {
    const [notification, notificationDispatch] = useContext(notificationContext)
    const [user, userDispatch] = useContext(userContext)

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

    const likesHandler = () => { blogsMutation.mutate({ blog, user }) }

    const removeHandler = () => {
        if (!window.confirm(`Are you sure yo want to remove ${blog.title}?`))
            return
        blogsDeleteMutation.mutate({ blog, user })
    }

    return (
        <>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a>
            <p>likes {blog.likes}<button onClick={likesHandler}>like</button></p>
            <p>added by {blog.author}</p>
            {user.id === blog.User.id ? 
                <p><button onClick={removeHandler}>remove</button></p>
                : null
            }
        </>
    )
}

export default Blog
