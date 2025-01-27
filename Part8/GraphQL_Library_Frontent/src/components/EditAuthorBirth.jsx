import { EDIT_AUTHOR, ALL_AUTHORS } from '../graphql/querys'
import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { useState } from 'react'
import useInput from '../hooks/useInput'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Select from 'react-select'

const EditAuthorBirth = () => {
  const authors = useQuery(ALL_AUTHORS)
  const [name, setName] = useState(null)
  const newBirthYear = useInput('number', 'newBirthYear', 'New Birth Year')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({
      variables: {
        name: name.value,
        setBornTo: Number(newBirthYear.value) || 0
      }
    })
  }

  if (authors.loading) return <div>...loading</div>
  return (
    <>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>name</Form.Label>
          <Select defaultValue={name} onChange={setName} options={authors.data.allAuthors.map((e) => ({ value: e.name, label: e.name }))} />
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