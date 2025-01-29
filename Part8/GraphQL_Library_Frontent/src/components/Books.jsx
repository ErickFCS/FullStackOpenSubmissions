import Table from 'react-bootstrap/Table'

import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql/querys'

const Books = () => {
  const books = useQuery(ALL_BOOKS)


  if (books.loading) return <div>...loading</div>
  return (
    <div>
      <h2>books</h2>
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Books
