import { useState } from 'react'
import BlogService from '../services/blogsService'

const CreateForm = ({ user, blogs, setBlogs, setMessage, setError }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createHandler = (event) => {
        event.preventDefault()
        BlogService
            .createBlog({ title, author, url }, user)
            .then((createdBlog) => {
                setMessage('blog creating successed')
                const newBlogs = blogs.concat(createdBlog)
                setBlogs(newBlogs)
                setTitle('')
                setAuthor('')
                setUrl('')
            })
            .catch((err) => {
                setError('blog creating failed')
            })
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createHandler}>
                title: <input onChange={({ target }) => { setTitle(target.value) }} type='text' name='title' /><br />
                author: <input onChange={({ target }) => { setAuthor(target.value) }} type='text' name='author' /><br />
                url: <input onChange={({ target }) => { setUrl(target.value) }} type='text' name='url' /><br />
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default CreateForm