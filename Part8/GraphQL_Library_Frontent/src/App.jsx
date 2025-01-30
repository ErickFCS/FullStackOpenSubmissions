import { BOOK_ADDED } from './graphql/querys'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import EditAuthorBirth from './components/EditAuthorBirth'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

import Nav from 'react-bootstrap/Nav'

const App = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('library_user_token')
    if (token) setToken(token)
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      window.alert("A new book was added")
    }
  })

  const handleLog = (res) => {
    const token = res.data.login.value
    localStorage.setItem('library_user_token', token)
    setToken(token)
  }

  return (
    <>
      <LoginForm handleLog={handleLog} token={token} />
      {token ?
        <>
          <Nav typeof='div' variant='tabs' fill>
            <Nav.Item><Link to='/authors'>authors</Link></Nav.Item>
            <Nav.Item><Link to='/recommended'>recommended</Link></Nav.Item>
            <Nav.Item><Link to='/books'>books</Link></Nav.Item>
            <Nav.Item><Link to='/add'>add</Link></Nav.Item>
          </Nav>
          <Routes>
            <Route path='/authors' element={
              <>
                <Authors />
                <EditAuthorBirth />
              </>
            } />
            <Route path='/recommended' element={<Recommendations />} />
            <Route path='/books' element={<Books />} />
            <Route path='/add' element={<NewBook />} />
            <Route path='/*' element={<Navigate replace to='/authors' />} />
          </Routes>
        </>
        : null}
    </>
  )
}

export default App
