import Blog from './Blog'
import BlogsService from '../services/blogsService'

const Blogs = ({ blogs, user, setBlogs }) => {
    blogs.sort((a, b) => b.likes - a.likes)
    const likesHandler = (blog) => {
        BlogsService
            .giveLike(blog, user)
            .then((res) => {
                let newBlogs = [...blogs]
                newBlogs[blog.index].likes = newBlogs[blog.index].likes + 1
                setBlogs(newBlogs)
            }).catch((err) => {
                console.error(err)
                return
            })
    }
    return (
        <>
            <h2>blogs</h2>
            {blogs.map((blog, index) => (
                <Blog key={index} blog={{ ...blog, index }} likesHandler={likesHandler} />
            ))}
        </>
    )
}

export default Blogs