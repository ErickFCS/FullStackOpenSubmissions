import { useState } from 'react'
import useInput from '../hooks/useInput'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const NewBook = () => {
  const title = useInput('text', 'title', 'title')
  const author = useInput('text', 'author', 'author')
  const published = useInput('text', 'published', 'published')
  const genre = useInput('text', 'genre', 'genre')
  const [genres, setGenres] = useState([])

  const submit = async (event) => {
    event.preventDefault()
    title.reset()
    published.reset()
    author.reset()
    genre.reset()
    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.value))
    genre.reset()
  }

  return (
    <>
      <Form onSubmit={submit}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control {...title.values} />
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control {...author.values} />
        </Form.Group>
        <Form.Group>
          <Form.Label>published</Form.Label>
          <Form.Control {...published.values} />
        </Form.Group>
        <Form.Group>
          <Form.Control {...genre.values} />
          <Button onClick={addGenre} type="button">add genre</Button>
        </Form.Group>
        <div>genres: {genres.join(' ')}</div>
        <Button type="submit">create book</Button>
      </Form>
    </>
  )
}

export default NewBook