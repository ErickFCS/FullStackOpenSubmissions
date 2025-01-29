import Table from 'react-bootstrap/Table'

import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql/querys'
import { ME } from '../graphql/querys'

const Recommendations = () => {
  const allBooks = useQuery(ALL_BOOKS)
  const filter = useQuery(ME)
  
  if (allBooks.loading || filter.loading) return <div>...loading</div>
  const books = allBooks.data.allBooks.filter((e) => (e.genres.includes(filter.data.me.favoriteGenre)))
  return (
    <div>
      <h2>recommended</h2>
      <p>books in you favorite genre </p>
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
    </div>
  )
}

export default Recommendations
