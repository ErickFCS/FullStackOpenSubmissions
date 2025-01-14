import { useState } from 'react'
import BlogsService from '../services/blogsService'

const Blog = ({ blog, user }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [buttonText, setButtonText] = useState("Show")
    const [likes, setLikes] = useState(blog.likes)
    const visibleWhenVisible = { display: isVisible ? 'block' : 'none' }
    const toggleVisibility = () => {
        let buttonText = isVisible ? 'Show' : 'Hide'
        setButtonText(buttonText)
        setIsVisible(!isVisible)
    }
    const likeHandler = () => {
        BlogsService
            .giveLike(blog, user)
            .then((res) => {
                setLikes(likes + 1)
            }).catch((err) => {
                return
            })
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
            <p style={{ ...text, ...visibleWhenVisible }}>likes {likes}
                <button onClick={likeHandler}>like</button>
            </p>
            <p style={{ ...text, ...visibleWhenVisible }}>{blog.author}</p>
        </div >
    )
}

export default Blog