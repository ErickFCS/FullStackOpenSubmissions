import { useState } from 'react'

const Person = ({ name }) => (
  <p>{name}</p>
)

const PersonList = ({ persons }) => (
  persons.map((e, i) => (
    <Person key={e.name + i} name={e.name} />
  ))
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleAdd = (event) => {
    event.preventDefault()
    if (persons.some((e) => ( e.name === newName))) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({ name: newName }))
  }

  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAdd}>
        <div>
          name: <input onChange={handleInput} />
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