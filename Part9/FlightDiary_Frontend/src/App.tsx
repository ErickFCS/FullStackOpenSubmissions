import { recordData } from './types';
import { useEffect, useState } from 'react';
import flightDiaries from './services/flightDiaries';
import Records from './components/Records';
import Header from './components/Header';
import RecordForm from './components/RecordForm';


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
            <Header />
            <Records records={records} />
            <br />
            <RecordForm records={records} setRecords={setRecords} />
        </>
    );
}

export default App;
