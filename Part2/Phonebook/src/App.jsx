import { useEffect, useState } from 'react'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import Search from './components/Search'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data)
    })
  }, [])

  const handleAdd = (event) => {
    event.preventDefault()
    if (newName == '' || newNumber == '') {
      alert("Empty fields not allowed")
      return
    }
    if (persons.some((e) => (e.name === newName && e.number === newNumber))) {
      alert(`${newName} is already added to phonebook with number ${newNumber}`)
      return
    }
    setPersons(persons.concat({ name: newName, number: newNumber, visible: true }))
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
    const newPersons = persons.map((e) => {
      let regExp = new RegExp(event.target.value, "i")
      if (e.name.match(regExp)) {
        e.visible = true
      } else {
        e.visible = false
      }
      return e
    })
    setPersons(newPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm handleAdd={handleAdd} handleNameInput={handleNameInput} handleNumberInput={handleNumberInput} />
      <h2>Numbers</h2>
      <PersonList persons={persons} />
    </div>
  )
}

export default App