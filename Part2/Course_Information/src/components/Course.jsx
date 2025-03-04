import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Stack from 'react-bootstrap/Stack'


const Header = props => (
    <>
        <h2 style={{ textAlign: 'center', margin: 0, }}>{props.course}</h2>
    </>
)

const Part = props => (
    <ListGroup.Item>
        {props.part} <Badge bg='secondary'>{props.exercises}</Badge>
    </ListGroup.Item>
)

const Content = ({ parts, },) => (
    <ListGroup>
        {parts.map((e, i,) => (
            <Part key={e.name + i} part={e.name} exercises={e.exercises} />
        ),)}
    </ListGroup>
)

const Total = ({ parts, },) => (
    <Card>
        <Card.Body>
            <Card.Text>
                <h3 style={{ margin: 0, }}>
                    Number of exercises {parts.reduce((v, e,) => (v + e.exercises), 0,)}
                </h3>
            </Card.Text>
        </Card.Body>
    </Card>
)

const Course = ({ course, },) => {
    const { name, parts, } = course
    return (
        <Stack gap={3} style={{ marginTop: 10, }}>
            <Header course={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </Stack>
    )
}

export default Course