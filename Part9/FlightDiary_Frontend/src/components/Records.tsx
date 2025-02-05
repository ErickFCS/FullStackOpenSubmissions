import { JSX } from 'react';
import { recordData } from '../types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Record from './Record';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';


const Records = ({ records }: { records: recordData[] }) => {
    const result: JSX.Element[] = [];
    for (let i = 0; i < records.length; i += 4) {
        result.push(
            <Row key={i}>
                {records.slice(i, i + 4).map((e, ii) => (
                    <Col key={ii}>
                        <Record {...e} />
                    </Col>
                ))}
            </Row>
        );
    }
    return (
        <Container fluid>
            <Stack gap={3}>
                {result}
            </Stack>
        </Container>
    );
};

export default Records;