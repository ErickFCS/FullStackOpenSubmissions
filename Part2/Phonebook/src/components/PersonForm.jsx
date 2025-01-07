const PersonForm = ({ handleAdd, handleNameInput, handleNumberInput }) => (
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
)

export default PersonForm