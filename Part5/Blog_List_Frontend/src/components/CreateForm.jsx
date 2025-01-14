import { useState, useEffect } from 'react'

const CreateForm = ({ user, createHandler, inputStates }) => {
    if (!user.name) return null
    const [isVisible, setIsVisible] = useState(false)
    const visibleWhenVisible = { display: isVisible ? 'block' : 'none' }
    const visibleWhenNoyVisible = { display: isVisible ? 'none' : 'block' }
    return (
        <>
            <div style={visibleWhenVisible}>
                <h2>create new</h2>
                <form onSubmit={createHandler}>
                    title: <input onChange={({ target }) => { inputStates.setTitle(target.value) }} type="text" name="title" /><br />
                    author: <input onChange={({ target }) => { inputStates.setAuthor(target.value) }} type="text" name="author" /><br />
                    url: <input onChange={({ target }) => { inputStates.setUrl(target.value) }} type="text" name="url" /><br />
                    <button type="submit">create</button>
                </form>
                <button onClick={() => { setIsVisible(false) }}>cancel</button>
            </div>
            <button style={visibleWhenNoyVisible} onClick={() => { setIsVisible(true) }}>create new</button>
        </>
    )
}

export default CreateForm