import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { recordData, newRecordData } from '../types';
import useInput from '../hooks/useInput';
import flightDiaries from '../services/flightDiaries';

const RecordForm = ({ records, setRecords }: { records: recordData[], setRecords: React.Dispatch<React.SetStateAction<recordData[]>> }) => {
    const date = useInput('date', 'date', 'date');
    const weather = useInput('text', 'weather', 'weather');
    const visibility = useInput('text', 'visibility', 'visibility');
    const comment = useInput('text', 'comment', 'comment');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: newRecordData = {
            date: date.value,
            weather: weather.value,
            visibility: visibility.value,
            comment: comment.value
        };
        flightDiaries
            .newOne(data)
            .then((res) => {
                setRecords(records.concat(res));
                date.reset();
                weather.reset();
                visibility.reset();
                comment.reset();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={3}>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control {...date.values} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Weather</Form.Label>
                    <Form.Control {...weather.values} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Visibility</Form.Label>
                    <Form.Control {...visibility.values} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control {...comment.values} />
                </Form.Group>
                <Button variant='success' type='submit'>Add</Button>
            </Stack>
        </Form>
    );
};

export default RecordForm;