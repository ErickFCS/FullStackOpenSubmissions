const CreateForm = ({ user, createHandler, inputStates }) => {
    if (!user.name) return null
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createHandler}>
                title: <input onChange={({ target }) => { inputStates.setTitle(target.value) }} type="text" name="title" /><br />
                author: <input onChange={({ target }) => { inputStates.setAuthor(target.value) }} type="text" name="author" /><br />
                url: <input onChange={({ target }) => { inputStates.setUrl(target.value) }} type="text" name="url" /><br />
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default CreateForm