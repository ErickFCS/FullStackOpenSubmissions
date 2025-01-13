import Blog from './Blog'

const Blogs = ({ user, blogs }) => {
    if (!user.name) return null
    return (
        <>
            <h2>blogs</h2>
            {blogs.map(blog => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </>
    )
}

export default Blogs