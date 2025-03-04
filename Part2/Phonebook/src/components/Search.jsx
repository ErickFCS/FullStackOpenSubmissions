import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'


const Search = ({ handleSearch, },) => (
    <InputGroup>
        <InputGroup.Text>Filter:</InputGroup.Text>
        <Form.Control type='text' onChange={handleSearch} />
        <Button variant='primary' onChange={handleSearch}>Search</Button>
    </InputGroup>
)

export default Search