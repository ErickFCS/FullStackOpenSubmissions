import { AlertData, recordData } from './types';
import { useEffect, useState } from 'react';
import flightDiaries from './services/flightDiaries';
import Records from './components/Records';
import Header from './components/Header';
import RecordForm from './components/RecordForm';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


function App() {
    const [records, setRecords] = useState([] as recordData[]);
    const [alertData, setAlertData] = useState({ show: false } as AlertData);

    useEffect(() => {
        flightDiaries
            .getAll()
            .then((res) => { setRecords(res); })
            .catch((err) => {
                setAlertData({
                    heading: 'Diary load Failed',
                    message: err,
                    show: true,
                    variant: 'danger'
                });
            });
    }, []);

    return (
        <>
            <Header />
            <Alert show={alertData.show} variant={alertData.variant}>
                <Alert.Heading>{alertData.heading}</Alert.Heading>
                <p>{alertData.message}</p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setAlertData({ ...alertData, show: false })} variant="outline-success">
                        Ok
                    </Button>
                </div>
            </Alert>
            <Records records={records} />
            <br />
            <RecordForm records={records} setRecords={setRecords} setAlertData={setAlertData} />
        </>
    );
}

export default App;
