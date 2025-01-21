import { clearUser, setUser } from '../reducers/user'
import { newNotification } from '../reducers/notifications'
import { useDispatch, useSelector } from 'react-redux'
import AccountService from '../services/accountService'
import useInput from '../hooks/useInput'

const AccountForm = () => {
    const dispatch = useDispatch()
    const password = useInput('password')
    const user = useSelector((state) => state.user)
    const username = useInput('text')

    const loginHandler = (event) => {
        event.preventDefault()
        AccountService.login(username.values.value, password.values.value)
            .then((newUser) => {
                dispatch(setUser(newUser))
                window.localStorage.setItem('user', JSON.stringify(newUser))
                dispatch(newNotification('login successful', 5))
                username.methods.reset()
                password.methods.reset()
            })
            .catch((err) => {
                dispatch(newNotification('login unsuccessful', 5, true))
            })
    }

    const logoutHandler = () => {
        dispatch(clearUser())
        window.localStorage.removeItem('user')
        dispatch(newNotification('logout successful', 5))
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
