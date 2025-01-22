import { setNotification, clearNotification } from '../context/notifications'
import { setUser, clearUser } from '../context/user'
import { useContext } from 'react'
import AccountService from '../services/accountService'
import notificationContext from '../context/notifications'
import useInput from '../hooks/useInput'
import userContext from '../context/user'

const AccountForm = () => {
    const [notification, notificationDispatch] = useContext(notificationContext)
    const [user, userDispatch] = useContext(userContext)
    const password = useInput('password')
    const username = useInput('text')

    const loginHandler = (event) => {
        event.preventDefault()
        AccountService.login(username.values.value, password.values.value)
            .then((newUser) => {
                userDispatch(setUser(newUser))
                window.localStorage.setItem('user', JSON.stringify(newUser))
                if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
                const timeOut = setTimeout(() => {
                    notificationDispatch(clearNotification())
                }, 5000)
                notificationDispatch(
                    setNotification({
                        message: 'login successful',
                        lastTimeOut: timeOut,
                    })
                )
                username.methods.reset()
                password.methods.reset()
            })
            .catch((err) => {
                if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
                const timeOut = setTimeout(() => {
                    notificationDispatch(clearNotification())
                }, 5000)
                notificationDispatch(
                    setNotification({
                        error: 'login unsuccessful',
                        lastTimeOut: timeOut,
                    })
                )
            })
    }

    const logoutHandler = () => {
        userDispatch(clearUser())
        window.localStorage.removeItem('user')
        if (notification.lastTimeOut) clearTimeout(notification.lastTimeOut)
        const timeOut = setTimeout(() => {
            notificationDispatch(clearNotification())
        }, 5000)
        notificationDispatch(
            setNotification({
                message: 'logout successful',
                lastTimeOut: timeOut,
            })
        )
    }

    if (!user.name)
        return (
            <>
                <h2>log in to application</h2>
                <form onSubmit={loginHandler}>
                    username:
                    <input {...username.values} placeholder='username' />
                    <br />
                    password:
                    <input {...password.values} placeholder='password' />
                    <br />
                    <button type='submit'>login</button>
                </form>
            </>
        )
    else
        return (
            <div>
                {user.username} is logged in
                <button type='button' onClick={logoutHandler}>
                    logout
                </button>
            </div>
        )
}

export default AccountForm
