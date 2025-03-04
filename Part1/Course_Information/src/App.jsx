import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Stack from 'react-bootstrap/Stack'


const Header = props => (
    <>
        <h1 style={{ textAlign: 'center', }}>{props.course}</h1>
    </>
)

const Part = props => (
    <ListGroup.Item>
        {props.part} <Badge bg='secondary'>{props.exercises}</Badge>
    </ListGroup.Item>
)

const Content = props => (
    <ListGroup>
        <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
        <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
        <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </ListGroup>
)

const Total = props => (
    <Card>
        <Card.Body>
            <Card.Title>
                <h3>
                    Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
                </h3>
            </Card.Title>
        </Card.Body>
    </Card>
)

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
            },
            {
                name: 'State of a component',
                exercises: 14,
            },
        ],
    }

    return (
        <Stack gap={3} style={{ marginTop: 10, }}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </Stack>
    )
}

export default App
