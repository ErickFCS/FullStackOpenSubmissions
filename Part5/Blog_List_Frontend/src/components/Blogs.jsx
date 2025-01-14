import Blog from './Blog'

const Blogs = ({ blogs, user }) => {
    return (
        <>
            <h2>blogs</h2>
            {blogs.map((blog, i) => (
                <Blog key={i} blog={blog} user={user} />
            ))}
        </>
    )
}

export default Blogs