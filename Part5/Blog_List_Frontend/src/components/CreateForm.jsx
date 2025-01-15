import { useState } from 'react'
import BlogService from '../services/blogsService'

const CreateForm = ({ createHandler }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const onSubmitHandler = (event) => {
        event.preventDefault()
        createHandler(title, author, url)
            .then(() => {
                setTitle('')
                event.target.title.value = ''
                setAuthor('')
                event.target.author.value = ''
                setUrl('')
                event.target.url.value = ''
            })
            .catch((err) => { })
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={onSubmitHandler}>
                title: <input onChange={({ target }) => { setTitle(target.value) }} placeholder='title' type='text' name='title' /><br />
                author: <input onChange={({ target }) => { setAuthor(target.value) }} placeholder='author' type='text' name='author' /><br />
                url: <input onChange={({ target }) => { setUrl(target.value) }} placeholder='url' type='text' name='url' /><br />
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default CreateForm