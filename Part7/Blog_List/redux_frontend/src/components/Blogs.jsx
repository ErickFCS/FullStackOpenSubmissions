import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
    let sortedBlog = [...blogs]
    sortedBlog.sort((a, b) => b.likes - a.likes)

    return (
        <>
            <h2>blogs</h2>
            {sortedBlog.map((blog, index) => (
                <div className='blogContainer' key={index}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>
            ))}
        </>
    )
}

export default Blogs
