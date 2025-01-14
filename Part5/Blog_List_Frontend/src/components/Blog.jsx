import { useState } from 'react'

const Blog = ({ blog, likesHandler, removeHandler, user }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [buttonText, setButtonText] = useState("Show")
    const visibleWhenVisible = { display: isVisible ? 'block' : 'none' }
    const toggleVisibility = () => {
        let buttonText = isVisible ? 'Show' : 'Hide'
        setButtonText(buttonText)
        setIsVisible(!isVisible)
    }
    const border = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const text = {
        fontSize: 18,
        margin: 0,
    }
    return (
        <div style={border}>
            <p style={text}>{blog.title}<button onClick={toggleVisibility}>{buttonText}</button></p>
            <p style={{ ...text, ...visibleWhenVisible }}>{blog.url}</p>
            <p style={{ ...text, ...visibleWhenVisible }}>likes {blog.likes}
                <button onClick={() => { likesHandler(blog) }}>like</button>
            </p>
            <p style={{ ...text, ...visibleWhenVisible }}>{blog.author}</p>
            {user.id === blog.User.id ?
                <p><button onClick={() => { removeHandler(blog) }}>remove</button></p> :
                null}
        </div >
    )
}

export default Blog