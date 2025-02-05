import { recordData } from './types';
import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import flightDiaries from './services/flightDiaries';
import Navbar from 'react-bootstrap/Navbar';
import Record from './components/Record';
import Row from 'react-bootstrap/Row';


function App() {
    const [records, setRecords] = useState([] as recordData[]);

    useEffect(() => {
        flightDiaries
            .getAll()
            .then((res) => { setRecords(res); })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Navbar>
                <Navbar.Brand>Flight Diary</Navbar.Brand>
            </Navbar>
            <Container fluid>
                <Row>
                    {records.map((e, i) => (
                        <Col key={i}>
                            <Record {...e} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default App;
