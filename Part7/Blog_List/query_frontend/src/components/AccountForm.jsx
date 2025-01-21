import PropTypes from 'prop-types'
import { useState, useContext } from 'react'
import AccountService from '../services/accountService'
import notificationContext from '../context/notifications'
import { setNotification, clearNotification } from '../context/notifications'

const AccountForm = ({ user, setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, notificationDispatch] = useContext(notificationContext)

    const loginHandler = (event) => {
        event.preventDefault()
        AccountService.login(username, password)
            .then((newUser) => {
                setUser(newUser)
                window.localStorage.setItem('user', JSON.stringify(newUser))
                if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
                const timeOut = setTimeout(() => {
                    notificationDispatch(clearNotification())
                }, 5000);
                notificationDispatch(setNotification({ message: 'login successful', lastTimeOut: timeOut }))
                setUsername('')
                setPassword('')
            })
            .catch((err) => {
                if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
                const timeOut = setTimeout(() => {
                    notificationDispatch(clearNotification())
                }, 5000);
                notificationDispatch(setNotification({ error: 'login unsuccessful', lastTimeOut: timeOut }))
            })
    }

    const logoutHandler = () => {
        setUser({})
        window.localStorage.removeItem('user')
        if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
        const timeOut = setTimeout(() => {
            notificationDispatch(clearNotification())
        }, 5000);
        notificationDispatch(setNotification({ message: 'logout successful', lastTimeOut: timeOut }))
    }

    if (!user.name)
        return (
            <>
                <h2>log in to application</h2>
                <form onSubmit={loginHandler}>
                    username:{' '}
                    <input
                        onChange={({ target }) => {
                            setUsername(target.value)
                        }}
                        name='username'
                        type='text'
                    />
                    <br />
                    password:{' '}
                    <input
                        onChange={({ target }) => {
                            setPassword(target.value)
                        }}
                        name='password'
                        type='password'
                    />
                    <br />
                    <button type='submit'>login</button>
                </form>
            </>
        )
    else
        return (
            <div>
                {user.username} is logged in{' '}
                <button type='button' onClick={logoutHandler}>
                    logout
                </button>
            </div>
        )
}

AccountForm.propType = {
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired
}

export default AccountForm
