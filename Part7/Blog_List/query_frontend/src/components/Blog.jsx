import { useState } from 'react'

const Blog = ({ blog, likesHandler, removeHandler, user }) => {
    const [buttonText, setButtonText] = useState('Show')
    const [isVisible, setIsVisible] = useState(false)
    const visibleWhenVisible = { display: isVisible ? 'block' : 'none' }
    const toggleVisibility = () => {
        let buttonText = isVisible ? 'Show' : 'Hide'
        setButtonText(buttonText)
        setIsVisible(!isVisible)
    }
    return (
        <div className='blogContainer'>
            <p>
                {blog.title}
                <button onClick={toggleVisibility}>{buttonText}</button>
            </p>
            <p>{blog.author}</p>
            <p style={visibleWhenVisible}>{blog.url}</p>
            <p style={visibleWhenVisible}>
                likes {blog.likes}
                <button onClick={() => { likesHandler(blog) }}>like</button>
            </p>
            {user.id === blog.User.id ? (
                <p style={visibleWhenVisible}>
                    <button onClick={() => { removeHandler(blog) }}>
                        remove
                    </button>
                </p>
            ) : null}
        </div >
    )
}

export default Blog
