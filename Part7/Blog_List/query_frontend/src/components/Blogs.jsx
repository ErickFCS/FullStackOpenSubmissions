import Blog from './Blog'
import BlogsService from '../services/blogsService'
import { useContext } from 'react'
import notificationContext from '../context/notifications'
import { setNotification, clearNotification } from '../context/notifications'

const Blogs = ({ blogs, user }) => {
    const [notification, notificationDispatch] = useContext(notificationContext)
    blogs.sort((a, b) => b.likes - a.likes)
    const likesHandler = (blog) => {
        // BlogsService.giveLike(blog, user)
        //     .then((res) => {
        //         let newBlogs = [...blogs]
        //         newBlogs[blog.index].likes = newBlogs[blog.index].likes + 1
        //         setBlogs(newBlogs)
        //         if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
        //         const timeOut = setTimeout(() => {
        //             notificationDispatch(clearNotification())
        //         }, 5000);
        //         notificationDispatch(setNotification({ message: 'Liked', lastTimeOut: timeOut }))
        //     })
        //     .catch((err) => {
        //         console.error(err)
        //         if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
        //         const timeOut = setTimeout(() => {
        //             notificationDispatch(clearNotification())
        //         }, 5000);
        //         notificationDispatch(setNotification({ error: 'Unable to like', lastTimeOut: timeOut }))
        //         return
        //     })
    }
    const removeHandler = (blog) => {
        // if (!window.confirm(`Are you sure yo want to remove ${blog.title}?`))
        //     return
        // BlogsService.deleteBlog(blog, user)
        //     .then((res) => {
        //         let newBlogs = blogs.filter((e) => e.id !== blog.id)
        //         setBlogs(newBlogs)
        //         if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
        //         const timeOut = setTimeout(() => {
        //             notificationDispatch(clearNotification())
        //         }, 5000);
        //         notificationDispatch(setNotification({ message: `${blog.title} removed`, lastTimeOut: timeOut }))
        //     })
        //     .catch((err) => {
        //         if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
        //         const timeOut = setTimeout(() => {
        //             notificationDispatch(clearNotification())
        //         }, 5000);
        //         notificationDispatch(setNotification({ error: `unable to remove ${blog.title}`, lastTimeOut: timeOut }))
        //     })
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
