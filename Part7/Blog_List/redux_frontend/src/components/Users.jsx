import { Link } from 'react-router-dom'

import Table from 'react-bootstrap/Table'

const Users = ({ users }) => {
    return (
        <>
            <h2>Users</h2>
            <Table striped >
                <thead>
                    <tr>
                        <th>username</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((e, i) => (
                        <tr key={i}>
                            <td>
                                <Link to={e.id}>{e.username}</Link>
                            </td>
                            <td>{e.Blog.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default Users
