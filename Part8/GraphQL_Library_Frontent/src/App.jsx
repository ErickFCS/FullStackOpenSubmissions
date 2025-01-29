import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthorBirth from './components/EditAuthorBirth'
import LoginForm from './components/LoginForm'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Nav from 'react-bootstrap/Nav'

const App = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('library_user_token')
    if (token) setToken(token)
  }, [])

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
          <Nav>
            <Nav.Item><Link to='/authors'>authors</Link></Nav.Item>
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
