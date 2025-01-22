import { clearUser, setUser } from '../reducers/user'
import { newNotification } from '../reducers/notifications'
import { useDispatch, useSelector } from 'react-redux'
import AccountService from '../services/accountService'
import useInput from '../hooks/useInput'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
                <Form onSubmit={loginHandler}>
                    <Form.Group>
                        <Form.Label>username:</Form.Label>
                        <Form.Control {...username.values} placeholder='username' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>password:</Form.Label>
                        <Form.Control {...password.values} placeholder='password' />
                    </Form.Group>
                    <Form.Group>
                        <Button type='submit'>login</Button>
                    </Form.Group>
                </Form>
            </>
        )
    else
        return (
            <Form id='login_status'>
                <Form.Group>
                    <Form.Label>{user.username} is logged in</Form.Label>{' '}
                    <Button variant='warning' type='button' onClick={logoutHandler}>logout</Button>
                </Form.Group>
            </Form>
        )
}

export default AccountForm
