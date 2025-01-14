const CreateForm = ({ user, createHandler }) => {
    if (!user.name) return null
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createHandler}>
                title: <input type="text" name="title" /><br />
                author: <input type="text" name="author" /><br />
                url: <input type="text" name="url" /><br />
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default CreateForm