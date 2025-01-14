import PropTypes from 'prop-types'
import { useState } from 'react'
import AccountService from '../services/accountService'

const AccountForm = ({ user, setUser, setError, setMessage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = (event) => {
        event.preventDefault()
        AccountService
            .login(username, password)
            .then((newUser) => {
                setUser(newUser)
                window.localStorage.setItem('user', JSON.stringify(newUser))
                setMessage('login successful')
                setUsername('')
                setPassword('')
            })
            .catch((err) => {
                setError('login unsuccessful')
            })
    }

    const logoutHandler = () => {
        setUser({})
        window.localStorage.removeItem('user')
        setMessage('logout successful')
    }

    if (!user.name) return (
        <>
            <h2>log in to application</h2>
            <form onSubmit={loginHandler}>
                username: <input onChange={({ target }) => { setUsername(target.value) }} name='username' type='text' />
                <br />
                password: <input onChange={({ target }) => { setPassword(target.value) }} name='password' type='password' />
                <br />
                <button type='submit'>login</button>
            </form>
        </>
    )
    else return (
        <div>
            {user.username} is logged in <button type='button' onClick={logoutHandler}>logout</button>
        </div>
    )
}

AccountForm.propType = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
}

export default AccountForm