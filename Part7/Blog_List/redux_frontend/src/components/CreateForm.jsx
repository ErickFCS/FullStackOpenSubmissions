import useInput from '../hooks/useInput'

const CreateForm = ({ createHandler }) => {
    const title = useInput('text')
    const author = useInput('text')
    const url = useInput('text')

    const onSubmitHandler = (event) => {
        event.preventDefault()
        createHandler(title.values.value, author.values.value, url.values.value)
            .then(() => {
                title.methods.reset()
                author.methods.reset()
                url.methods.reset()
            })
            .catch((err) => {})
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={onSubmitHandler}>
                title:
                <input {...title.values} placeholder='title' />
                <br />
                author:
                <input {...author.values} placeholder='author' />
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
