import Table from 'react-bootstrap/Table'

import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../graphql/querys'

const Authors = () => {
  const authors = useQuery(ALL_AUTHORS)

  
  if (authors.loading) return <div>...Loading</div>
  return (
    <div>
      <h2>authors</h2>
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Authors
