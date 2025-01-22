import { addComment, giveLike, removeBlog } from '../reducers/blogs'
import { newNotification } from '../reducers/notifications'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useInput from '../hooks/useInput'

const Blog = ({ blog }) => {
    if (!blog) return null
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const comment = useInput('text')

    const likesHandler = () => {
        dispatch(giveLike(blog, user))
            .then((res) => {
                dispatch(newNotification('Liked', 5))
            })
            .catch((err) => {
                dispatch(newNotification('Unable to like', 5, true))
            })
    }
    const removeHandler = () => {
        if (!window.confirm(`Are you sure yo want to remove ${blog.title}?`))
            return
        dispatch(removeBlog(blog, user))
            .then((res) => {
                dispatch(newNotification(`${blog.title} removed`, 5))
            })
            .catch((err) => {
                dispatch(
                    newNotification(`unable to remove ${blog.title}`, 5, true)
                )
            })
        navigate('/')
    }
    const commentHandler = (event) => {
        event.preventDefault()
        dispatch(addComment(blog, user, comment.values.value))
        comment.methods.reset()
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
            <h3>comments</h3>
            <form onSubmit={commentHandler}>
                <input {...comment.values} placeholder='comment here' />
                <button type='submit'>comment</button>
            </form>
            <ul>
                {blog.comments.map((e, i) => (
                    <li key={i}>{e}</li>
                ))}
            </ul>
        </>
    )
}

export default Blog
