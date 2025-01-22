import { Link } from 'react-router-dom'

import ListGroup from 'react-bootstrap/ListGroup'

const Blogs = ({ blogs }) => {
    let sortedBlog = [...blogs]
    sortedBlog.sort((a, b) => b.likes - a.likes)

    return (
        <>
            <h2>blogs</h2>
            <ListGroup>
                {sortedBlog.map((blog, index) => (
                    <ListGroup.Item className='blogContainer' key={index}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    )
}

export default Blogs
