import { useEffect, useState, } from 'react'
import Message from './components/Message'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import phonebookService from './services/phonebookService'
import Search from './components/Search'
import Stack from 'react-bootstrap/Stack'

const App = () => {
    const [persons, setPersons,] = useState([],)
    const [newName, setNewName,] = useState('',)
    const [newNumber, setNewNumber,] = useState('',)
    const [message, setMessage,] = useState(null,)
    const [error, setError,] = useState(null,)

    useEffect(() => {
        phonebookService.fetchData().then((res,) => {
            res.forEach((e,) => { e.visible = true },)
            setPersons(res,)
        },)
    }, [],)

    const handleAdd = (event,) => {
        event.preventDefault()
        if (newName === '' || newNumber === '') {
            setError('Empty fields not allowed',)
            setTimeout(() => {
                setError(null,)
            }, 3000,)
            return
        }
        if (persons.some((e,) => (e.name === newName && e.number === newNumber),)) {
            setError(`${newName} is already added to the Phone Book with number ${newNumber}`,)
            setTimeout(() => {
                setError(null,)
            }, 3000,)
            return
        }
        const existIndex = persons.findIndex((e,) => (e.name === newName),)
        if (existIndex !== -1) {
            const exist = persons[existIndex]
            if (!window.confirm(`${newName} is already added to the Phone Book, wanna replace old number ${exist.number} with new number ${newNumber}`,)) return
            const newPerson = { name: newName, number: newNumber, visible: true, }

            phonebookService.updateData(exist.id, newPerson,).then(() => {
                setMessage('Person updated to the Phone Book',)
                setTimeout(() => {
                    setMessage(null,)
                }, 3000,)
                const newPersons = [...persons,]
                newPersons.splice(existIndex, 1, newPerson,)
                setPersons(newPersons,)
            },).catch((err,) => {
                console.log(err,)
                setError(err.response.data.error || 'Unable to update person',)
                setTimeout(() => {
                    setError(null,)
                }, 3000,)
            },)
            return
        }
        const newPerson = { name: newName, number: newNumber, visible: true, }

        phonebookService.createData(newPerson,).then(() => {
            setMessage(`${newName} added to the Phone Book`,)
            setTimeout(() => {
                setMessage(null,)
            }, 3000,)
            setPersons(persons.concat(newPerson,),)
        },).catch((err,) => {
            console.log(err,)
            setError(err.response.data.error || 'Unable to add person',)
            setTimeout(() => {
                setError(null,)
            }, 3000,)
        },)
    }

    const handleNameInput = (event,) => {
        setNewName(event.target.value,)
    }

    const handleNumberInput = (event,) => {
        setNewNumber(event.target.value,)
    }

    const handleSearch = (event,) => {
        const newPersons = persons.map((e,) => {
            let regExp = new RegExp(event.target.value, 'i',)
            if (e.name.match(regExp,)) {
                e.visible = true
            } else {
                e.visible = false
            }
            return e
        },)
        setPersons(newPersons,)
    }

    const handleDelete = (obj,) => {
        if (!window.confirm(`Are you sure you want to delete ${obj.name}?`,)) return
        phonebookService.deleteData(obj.id,).then(() => {
            const newPersons = persons.filter((e,) => (!(e.id === obj.id)),)
            setPersons(newPersons,)
        },).catch((err,) => {
            console.log(err,)
            setError(`Unable to delete ${obj.name}`,)
            setTimeout(() => {
                setError(null,)
            }, 3000,)
        },)
    }

    return (
        <Stack gap={3} style={{ alignItems: 'center', marginTop: 30, marginBottom: 30, }}>
            <h1 style={{ textAlign: 'center', }}>Phone Book</h1>
            <Message message={message} error={error} />
            <Search handleSearch={handleSearch} />
            <PersonForm handleAdd={handleAdd} handleNameInput={handleNameInput} handleNumberInput={handleNumberInput} />
            <h2>Numbers</h2>
            <PersonList persons={persons} onDelete={handleDelete} />
        </Stack>
    )
}

export default App