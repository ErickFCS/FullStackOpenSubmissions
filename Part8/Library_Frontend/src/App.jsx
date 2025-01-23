import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import EditAuthorBirth from './components/EditAuthorBirth'
import { Routes, Route, Link, Navigate } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav'

const App = () => {

  return (
    <>
      <Nav>
        <Nav.Item><Link to='/authors'>authors</Link></Nav.Item>
        <Nav.Item><Link to='/books'>books</Link></Nav.Item>
        <Nav.Item><Link to='/add'>add</Link></Nav.Item>
      </Nav>
      <Routes>
        <Route path="/authors" element={
          <>
            <Authors />
            <EditAuthorBirth />
          </>
        } />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/*" element={<Navigate replace to='/authors' />} />
      </Routes>
    </>
  );
};

export default App;
