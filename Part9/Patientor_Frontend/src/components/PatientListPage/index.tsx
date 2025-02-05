import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';
import { PatientFormValues, Patient } from '../../types';
import { useState } from 'react';
import AddPatientModal from '../AddPatientModal';
import axios from 'axios';
import HealthRatingBar from '../HealthRatingBar';
import patientService from '../../services/patients';
import { Link } from 'react-router-dom';

interface Props {
    patients: Patient[]
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
}

const PatientListPage = ({ patients, setPatients }: Props) => {

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewPatient = async (values: PatientFormValues) => {
        try {
            const patient = await patientService.create(values);
            setPatients(patients.concat(patient));
            setModalOpen(false);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === 'string') {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                } else {
                    setError('Unrecognized axios error');
                }
            } else {
                console.error('Unknown error', e);
                setError('Unknown error');
            }
        }
    };

    return (
        <div className="App">
            <Box>
                <Typography align="center" variant="h6">
                    Patient list
                </Typography>
            </Box>
            <Table style={{ marginBottom: '1em' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Occupation</TableCell>
                        <TableCell>Health Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(patients).map((patient: Patient) => (
                        <TableRow key={patient.id}>
                            <TableCell>
                                <Link to={`/patients/${patient.id}`}>
                                    {patient.name}
                                </Link>
                            </TableCell>
                            <TableCell>
                                {patient.gender === "female" ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M38 18c0 7.396-5.735 13.452-13 13.965V37h5a1 1 0 1 1 0 2h-5v4a1 1 0 1 1-2 0v-4h-5a1 1 0 1 1 0-2h5v-5.035c-7.265-.513-13-6.57-13-13.965c0-7.732 6.268-14 14-14s14 6.268 14 14M24 30c6.627 0 12-5.373 12-12S30.627 6 24 6s-12 5.373-12 12s5.373 12 12 12" clip-rule="evenodd" /></svg>
                                    : (
                                        patient.gender === "male" ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M30.5 7a1 1 0 0 1 1-1H42v10.5a1 1 0 1 1-2 0V9.414l-8.564 8.564A14.44 14.44 0 0 1 35 27.5C35 35.508 28.508 42 20.5 42S6 35.508 6 27.5S12.492 13 20.5 13c3.644 0 6.974 1.344 9.522 3.564L38.586 8H31.5a1 1 0 0 1-1-1m-10 33C27.404 40 33 34.404 33 27.5S27.404 15 20.5 15S8 20.596 8 27.5S13.596 40 20.5 40" clip-rule="evenodd" /></svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M12 9a1 1 0 1 0 0-2H8a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-1.586l5.753 5.753a1 1 0 0 0 .365.233A9.96 9.96 0 0 0 14 21c0 5.185 3.947 9.449 9 9.95v5.98h-2a1 1 0 1 0 0 2h2V41a1 1 0 1 0 2 0v-2.07h2a1 1 0 0 0 0-2h-2v-5.98c5.053-.501 9-4.765 9-9.95a9.96 9.96 0 0 0-1.073-4.511l2.104-2.091l1.43 1.43a1 1 0 0 0 1.414-1.415l-1.425-1.425L39 10.454V12a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1h-4a1 1 0 1 0 0 2h1.626l-2.59 2.574l-1.404-1.404a1 1 0 0 0-1.414 1.415l1.399 1.398l-1.796 1.785A9.98 9.98 0 0 0 24 11a9.98 9.98 0 0 0-7.82 3.766l-.013-.013L10.414 9zm12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16" clip-rule="evenodd" /></svg>
                                    )
                                }
                            </TableCell>
                            <TableCell>{patient.occupation}</TableCell>
                            <TableCell>
                                <HealthRatingBar showText={false} rating={1} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <AddPatientModal
                modalOpen={modalOpen}
                onSubmit={submitNewPatient}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Patient
            </Button>
        </div>
    );
};

export default PatientListPage;
