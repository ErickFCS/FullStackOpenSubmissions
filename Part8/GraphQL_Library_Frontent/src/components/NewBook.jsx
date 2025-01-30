import { ADD_BOOK } from '../graphql/querys'
import { ALL_BOOKS } from '../graphql/querys'
import { BOOK_ADDED } from '../graphql/querys'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSubscription } from '@apollo/client'
import useInput from '../hooks/useInput'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const NewBook = ({ filterState }) => {
  const navigate = useNavigate()
  const title = useInput('text', 'title', 'title')
  const author = useInput('text', 'author', 'author')
  const published = useInput('number', 'published', 'published')
  const genre = useInput('text', 'genre', 'genre')
  const [genres, setGenres] = useState([])
  const [addBook] = useMutation(ADD_BOOK)
  const [filter, setFilter] = filterState
  
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const bookAdded = data.data.bookAdded
      client.cache.updateQuery(
        {
          query: ALL_BOOKS,
          variables: { genre: filter },
        },
        ({ allBooks }) => ({ allBooks: allBooks.concat(bookAdded) })
      )
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    addBook({
      variables: {
        title: title.value,
        published: Number(published.value) || 0,
        author: author.value,
        genres: genres
      }
    })
    title.reset()
    published.reset()
    author.reset()
    genre.reset()
    setGenres([])
    navigate('/books')
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