import { ALL_BOOKS } from '../graphql/querys'
import { BOOK_ADDED } from '../graphql/querys'
import { useQuery } from '@apollo/client'
import { useSubscription } from '@apollo/client'

import Button from 'react-bootstrap/esm/Button'
import Table from 'react-bootstrap/Table'

const Books = ({ filterState }) => {
  const [filter, setFilter] = filterState
  const allBooks = useQuery(ALL_BOOKS, { variables: { genre: filter } })
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

  if (allBooks.loading) return <div>...loading</div>
  const genres = ["refactoring", "agile", "patterns", "design", "classic", "crime", "revolution"]
  const books = allBooks.data.allBooks
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
