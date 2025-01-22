import { addComment, giveLike, removeBlog } from '../reducers/blogs'
import { newNotification } from '../reducers/notifications'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useInput from '../hooks/useInput'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/esm/ListGroup'

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
        if (!window.confirm(`Are you sure yo want to remove ${blog.title}?`)) return
        dispatch(removeBlog(blog, user))
            .then((res) => {
                dispatch(newNotification(`${blog.title} removed`, 5))
            })
            .catch((err) => {
                dispatch(newNotification(`unable to remove ${blog.title}`, 5, true))
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
            <p>
                likes {blog.likes}{' '}
                <Button variant='success' onClick={likesHandler}>like</Button>
            </p>
            <p>added by {blog.author}</p>
            {user.id === blog.User.id ? (
                <Button variant='danger' onClick={removeHandler}>remove</Button>
            ) : null}
            <h3>comments</h3>
            <Form onSubmit={commentHandler}>
                <Form.Group>
                    <Form.Label>Comment your thoughts:</Form.Label>
                    <Form.Control {...comment.values} placeholder='comment here' />
                </Form.Group>
                <div className='smallSpace' />
                <Button variant='success' type='submit'>comment</Button>
            </Form>
            <div className='smallSpace' />
            <div className='smallSpace' />
            <ListGroup>
                {blog.comments.map((e, i) => (
                    <ListGroup.Item key={i}>{e}</ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )
}

export default Blog
