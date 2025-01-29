import useInput from '../hooks/useInput'
import { useApolloClient, useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/querys'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginForm = ({ handleLog, token }) => {
    const username = useInput('text', 'username', 'username')
    const password = useInput('password', 'password', 'password')
    const client = useApolloClient()
    const [loginMutation, loginResult] = useMutation(LOGIN, {
        onError: (err) => {
            console.error(err)
            return { data: { login: { value: null } } }
        }
    })

    const onSubmit = async (event) => {
        event.preventDefault()
        await loginMutation({
            variables: {
                username: username.value,
                password: password.value
            }
        })
        handleLog(loginResult)
        username.reset()
        password.reset()
    }

    const onLogout = async () => {
        await client.resetStore()
        handleLog({ data: { login: { value: null } } })
        loginResult.reset()
    }

    return (
        <>
            {token ?
                <>
                    <Button type='warning' onClick={onLogout}>LOGOUT</Button>
                </>
                :
                <>
                    <Form onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control {...username.values} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control {...password.values} />
                        </Form.Group>
                        <Button type='submit'>LOGIN</Button>
                    </Form>
                </>}
        </>
    )
}

export default LoginForm