import { useState } from 'react'
import useInput from '../hooks/useInput'

const CreateForm = ({ createHandler }) => {
    const author = useInput('text')
    const title = useInput('text')
    const url = useInput('text')

    const onSubmitHandler = (event) => {
        event.preventDefault()
        createHandler(author.values.value, title.values.value, url.values.value)
            .then(() => {
                author.methods.reset()
                title.methods.reset()
                url.methods.reset()
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={onSubmitHandler}>
                title:
                <input {...title.values} placeholder='author' />
                <br />
                author:
                <input {...author.values} placeholder='title' />
                <br />
                url:
                <input {...url.values} placeholder='url' />
                <br />
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default CreateForm
