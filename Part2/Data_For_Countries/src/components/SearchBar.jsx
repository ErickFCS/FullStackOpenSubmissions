import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'


const SearchBar = ({ handleSearch, },) => (
    <InputGroup>
        <InputGroup.Text>Find country</InputGroup.Text>
        <Form.Control type='text' onChange={handleSearch} />
        <Button variant='primary' onChange={handleSearch}>Search</Button>
    </InputGroup>
)

export default SearchBar