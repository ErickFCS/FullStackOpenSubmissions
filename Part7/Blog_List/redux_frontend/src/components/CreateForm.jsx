import useInput from '../hooks/useInput'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateForm = ({ createHandler }) => {
    const title = useInput('text')
    const author = useInput('text')
    const url = useInput('text')

    const onSubmitHandler = (event) => {
        event.preventDefault()
        createHandler(title.values.value, author.values.value, url.values.value)
            .then(() => {
                title.methods.reset()
                author.methods.reset()
                url.methods.reset()
            })
            .catch((err) => { })
    }

    return (
        <>
            <h2>create new</h2>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group>
                    <Form.Label>title:</Form.Label>
                    <Form.Control {...title.values} placeholder='title' />
                </Form.Group>
                <Form.Group>
                    <Form.Label>author:</Form.Label>
                    <Form.Control {...author.values} placeholder='author' />
                </Form.Group>
                <Form.Group>
                    <Form.Label>url:</Form.Label>
                    <Form.Control {...url.values} placeholder='url' />
                </Form.Group>
                <br />
                <Button variant='success' type='submit'>create</Button>
            </Form>
        </>
    )
}

export default CreateForm
