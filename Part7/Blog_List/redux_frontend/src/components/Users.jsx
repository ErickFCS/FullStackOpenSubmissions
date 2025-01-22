import { useEffect, useState } from 'react'
import userService from '../services/userService'

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        userService
            .fetchAll()
            .then((res) => {
                setUsers(res)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])
    return (
        <>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>username</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((e, i) => (
                        <tr key={i}>
                            <td>{e.username}</td>
                            <td>{e.Blog.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Users