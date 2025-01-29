import Table from 'react-bootstrap/Table'

import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../graphql/querys'
import { ME } from '../graphql/querys'

const Recommendations = () => {
  const filter = useQuery(ME)
  const allBooks = useQuery(ALL_BOOKS, {
    skip: !filter.data,
    variables:{
      genre: filter.data?.me?.favoriteGenre
    }
  })
  
  if (allBooks.loading || filter.loading) return <div>...loading</div>
  const books = allBooks.data.allBooks
  return (
    <div>
      <h2>recommended</h2>
      <p>books in you favorite genre {filter.data.me.favoriteGenre}</p>
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
