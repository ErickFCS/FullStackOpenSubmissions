import useInput from '../hooks/useInput'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../graphql/querys'
import { useMutation } from '@apollo/client'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const EditAuthorBirth = () => {
  const name = useInput('text', 'name', 'name')
  const newBirthYear = useInput('number', 'newBirthYear', 'New Birth Year')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({
      variables: {
        name: name.value,
        setBornTo: Number(newBirthYear.value) || 0
      }
    })
    name.reset()
    newBirthYear.reset()
  }

  return (
    <>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>name</Form.Label>
          <Form.Control {...name.values} />
        </Form.Group>
        <Form.Group>
          <Form.Label>new birth year</Form.Label>
          <Form.Control {...newBirthYear.values} />
        </Form.Group>
        <Button type="submit">change birth year</Button>
      </Form>
    </>
  )
}

export default EditAuthorBirth