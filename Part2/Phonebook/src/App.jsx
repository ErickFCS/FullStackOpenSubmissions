import { useState } from 'react'

const Person = ({ name, number}) => (
  <p>{name} {number}</p>
)

const PersonList = ({ persons }) => (
  persons.map((e, i) => (
    <Person key={e.name + i} name={e.name} number={e.number}/>
  ))
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-1234567" }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
    setPersons(persons.concat({ name: newName, number: newNumber }))
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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