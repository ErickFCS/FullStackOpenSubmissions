import { recordData } from '../types';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

const Record = ({ weather, visibility, date, comment }: recordData) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{date} Flight</Card.Title>
                <Stack gap={2}>
                    <Card.Subtitle>Weather: {weather}</Card.Subtitle>
                    <Card.Subtitle>Visibility: {visibility}</Card.Subtitle>
                </Stack>
                <Card.Text>{comment}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Record;