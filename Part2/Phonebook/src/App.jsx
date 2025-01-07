import { useState } from 'react'

const Person = ({ name, number }) => (
  <p>{name} {number}</p>
)

const PersonList = ({ persons }) => (
  persons.map((e, i) => {
    if (!e.visible) return
    return (
      <Person key={e.name + i} name={e.name} number={e.number} />
    )
  })
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-1234567", visible: true },
    { name: 'Johnny Pierce', number: "13194856", visible: true },
    { name: 'Jordan Norman', number: "67460348", visible: true },
    { name: 'Nannie Lynch', number: "67979746", visible: true },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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
      <div>
        filter shown with<input type="search" onChange={handleSearch} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleAdd}>
        <div>
          name: <input onChange={handleNameInput} />
        </div>
        <div>
          number: <input onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PersonList persons={persons} />
    </div>
  )
}

export default App