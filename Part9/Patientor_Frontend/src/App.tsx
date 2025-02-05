import { apiBaseUrl } from './constants';
import { Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';
import { Patient } from './types';
import { useMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PatientListPage from './components/PatientListPage';
import PatientPage from './components/PatientPage';
import patientService from './services/patients';

const App = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const match = useMatch('/patients/:id');
    const patientId = match ? match.params.id : undefined;

    useEffect(() => {
        void axios.get<void>(`${apiBaseUrl}/ping`);

        const fetchPatientList = async () => {
            const patients = await patientService.getAll();
            setPatients(patients);
        };
        void fetchPatientList();
    }, []);

    return (
        <div className="App">
            <Container>
                <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
                    Patientor
                </Typography>
                <Button component={Link} to="/" variant="contained" color="primary">
                    Home
                </Button>
                <Divider hidden />
                <Routes>
                    <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
                    <Route path="/patients/:id" element={<PatientPage patientId={patientId} />} />
                </Routes>
            </Container>
        </div>
    );
};

export default App;
