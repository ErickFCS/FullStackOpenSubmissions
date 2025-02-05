import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { recordData, newRecordData, AlertData } from '../types';
import useInput from '../hooks/useInput';
import useRadio from '../hooks/useRadio';
import flightDiaries from '../services/flightDiaries';

interface Prop_Type {
    records: recordData[];
    setRecords: React.Dispatch<React.SetStateAction<recordData[]>>;
    setAlertData: React.Dispatch<React.SetStateAction<AlertData>>;
}

const RecordForm = ({ records, setRecords, setAlertData }: Prop_Type) => {
    const date = useInput('date', 'date', 'date');
    const weather = useRadio('weather', true);
    const visibility = useRadio('visibility', true);
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
                setAlertData({
                    heading: 'Record creation succed',
                    message: 'Record updated to the server',
                    show: true,
                    variant: 'success'
                });
            })
            .catch((err: string) => {
                setAlertData({
                    heading: 'Record creation failed',
                    message: err,
                    show: true,
                    variant: 'danger'
                });
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
                    <br />
                    <Form.Check {...weather.values} label='sunny' />
                    <Form.Check {...weather.values} label='rainy' />
                    <Form.Check {...weather.values} label='cloudy' />
                    <Form.Check {...weather.values} label='stormy' />
                    <Form.Check {...weather.values} label='windy' />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Visibility</Form.Label>
                    <br />
                    <Form.Check {...visibility.values} label='great' />
                    <Form.Check {...visibility.values} label='good' />
                    <Form.Check {...visibility.values} label='ok' />
                    <Form.Check {...visibility.values} label='poor' />
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