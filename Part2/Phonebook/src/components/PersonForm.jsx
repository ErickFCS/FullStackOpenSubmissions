import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Stack from 'react-bootstrap/esm/Stack'


const PersonForm = ({ handleAdd, handleNameInput, handleNumberInput, },) => (
    <Card style={{ width: '90%', maxWidth: 400, }}>
        <Card.Body>
            <Form onSubmit={handleAdd}>
                <Stack gap={2}>
                    <Card.Title>
                        <h2 style={{ textAlign: 'center', margin: 0, }}>Add</h2>
                    </Card.Title>
                    <Form.Group>
                        <Form.Group>
                            <InputGroup>
                                <InputGroup.Text>Name:</InputGroup.Text>
                                <Form.Control onChange={handleNameInput} />
                            </InputGroup>
                        </Form.Group>
                    </Form.Group>
                    <Form.Group>
                        <Form.Group>
                            <InputGroup>
                                <InputGroup.Text>Number:</InputGroup.Text>
                                <Form.Control onChange={handleNumberInput} />
                            </InputGroup>
                        </Form.Group>
                    </Form.Group>
                    <Button type='submit'>add</Button>
                </Stack>
            </Form>
        </Card.Body>
    </Card>
)

export default PersonForm