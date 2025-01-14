import Blog from './Blog'

const Blogs = ({ blogs }) => {
    return (
        <>
            <h2>blogs</h2>
            {blogs.map((blog, i) => (
                <Blog key={i} blog={blog} />
            ))}
        </>
    )
}

export default Blogs