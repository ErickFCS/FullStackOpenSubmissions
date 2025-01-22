import { Link } from "react-router-dom"

const Blogs = ({ blogs }) => {

    blogs.sort((a, b) => b.likes - a.likes)

    return (
        <>
            <h2>blogs</h2>
            {blogs.map((blog, index) => (
                <div className='blogContainer' key={index}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>
            ))}
        </>
    )
}

export default Blogs
