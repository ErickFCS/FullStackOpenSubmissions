import { useState } from 'react'

const CreateForm = ({ createHandler }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
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