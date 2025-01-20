import Blog from './Blog'
import BlogsService from '../services/blogsService'
import { useDispatch } from 'react-redux'
import { newNotification } from '../reducers/notifications'

const Blogs = ({ blogs, user, setBlogs }) => {
    const dispatch = useDispatch()
    blogs.sort((a, b) => b.likes - a.likes)
    const likesHandler = (blog) => {
        BlogsService.giveLike(blog, user)
            .then((res) => {
                let newBlogs = [...blogs]
                newBlogs[blog.index].likes = newBlogs[blog.index].likes + 1
                setBlogs(newBlogs)
                dispatch(newNotification('Liked', 5))
            })
            .catch((err) => {
                console.error(err)
                dispatch(newNotification('Unable to like', 5, true))
                return
            })
    }
    const removeHandler = (blog) => {
        if (!window.confirm(`Are you sure yo want to remove ${blog.title}?`))
            return
        BlogsService.deleteBlog(blog, user)
            .then((res) => {
                let newBlogs = blogs.filter((e) => e.id !== blog.id)
                setBlogs(newBlogs)
                dispatch(newNotification(`${blog.title} removed`, 5))
            })
            .catch((err) => {
                dispatch(newNotification(`unable to remove ${blog.title}`, 5, true))
            })
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
