const Person = ({ name, number, onDelete }) => (
    <div>
        <p>{name} {number}</p>
        <button onClick={onDelete}>delete</button>
    </div>
)

const PersonList = ({ persons, onDelete }) => (
    <>
        {persons.map((e, i) => {
            if (!e.visible) return
            return (
                <Person key={e.name + i} id={e.id} name={e.name} number={e.number} onDelete={() => { onDelete(e) }} />
            )
        })}
    </>
)

export default PersonList