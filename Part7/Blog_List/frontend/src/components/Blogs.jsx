import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { newNotification } from '../reducers/notifications'
import { giveLike, removeBlog } from '../reducers/blogs'

const Blogs = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    var blogs = [...useSelector(state => state.blogs)]
    blogs.sort((a, b) => b.likes - a.likes)
    const likesHandler = (blog) => {
        dispatch(giveLike(blog, user))
            .then((res) => {
                dispatch(newNotification('Liked', 5))
            })
            .catch((err) => {
                dispatch(newNotification('Unable to like', 5, true))
            })
    }
    const removeHandler = (blog) => {
        if (!window.confirm(`Are you sure yo want to remove ${blog.title}?`))
            return
        dispatch(removeBlog(blog, user))
            .then((res) => {
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
                    blog={blog}
                    likesHandler={likesHandler}
                    removeHandler={removeHandler}
                    user={user}
                />
            ))}
        </>
    )
}

export default Blogs
