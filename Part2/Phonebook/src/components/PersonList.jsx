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

export default PersonList