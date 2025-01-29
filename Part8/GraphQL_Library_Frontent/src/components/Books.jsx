import Table from 'react-bootstrap/Table'

import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql/querys'
import Button from 'react-bootstrap/esm/Button'
import { useState } from 'react'

const Books = () => {
  const allBooks = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)

  if (allBooks.loading) return <div>...loading</div>
  const genres = [...new Set(allBooks.data.allBooks.flatMap((e) => e.genres))]
  const books = filter ? allBooks.data.allBooks.filter((e) => (e.genres.includes(filter))) : allBooks.data.allBooks
  return (
    <div>
      <h2>books</h2>
      {filter ? <p>in genre {filter}</p> : null}
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={() => { setFilter(null) }}>all</Button>
      {genres.map((e, i) => (
        <Button key={i} onClick={() => { setFilter(e) }}>{e}</Button>
      ))}
    </div>
  )
}

export default Books
