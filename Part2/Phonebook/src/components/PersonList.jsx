import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/esm/Card'
import Stack from 'react-bootstrap/esm/Stack'


const Person = ({ name, number, onDelete, },) => (
    <Card style={{ width: '90%', maxWidth: 400, }}>
        <Card.Body>
            <Stack direction='horizontal' gap={2} style={{ alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', }}>
                <Stack direction='horizontal' style={{ alignItems: 'center', flexGrow: 1, justifyContent: 'space-between', }}>
                    <Card.Title style={{ margin: 0, }}>
                        {name}
                    </Card.Title>
                    <Card.Text style={{ margin: 0, }}>
                        {number}
                    </Card.Text>
                </Stack>
                <Button variant='danger' onClick={onDelete}>delete</Button>
            </Stack>
        </Card.Body>
    </Card>
)

const PersonList = ({ persons, onDelete, },) => (
    <Stack gap={4} direction='horizontal' style={{ flexWrap: 'wrap', justifyContent: 'center', }}>
        {persons.map((e, i,) => {
            if (!e.visible) return
            return (
                <Person key={e.name + i} id={e.id} name={e.name} number={e.number} onDelete={() => { onDelete(e,) }} />
            )
        },)}
    </Stack>
)

export default PersonList