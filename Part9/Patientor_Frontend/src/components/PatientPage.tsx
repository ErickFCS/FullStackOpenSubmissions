import { Button } from '@mui/material';
import { Diagnosis, Patient, Entry, NewEntry, HealthCheckRating } from '../types';
import { useEffect, useState } from 'react';
import patientServices from '../services/patients';
import AddEntryModal from './AddEntryModal';
import { z, ZodError } from 'zod';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryComponent = ({ entry, diagnosis }: { entry: Entry, diagnosis: Diagnosis[] }) => {
    const cardStyle = {
        border: 'solid #000 2px',
        padding: '10px',
        margin: '10px'
    };
    switch (entry.type) {
    case 'HealthCheck':
        return (
            <div style={cardStyle}>
                <p>{entry.type}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="currentColor" fillRule="evenodd" d="M20 4a3 3 0 0 0-3 3h-3a3 3 0 0 0-3 3v28a3 3 0 0 0 3 3h12v-2H14a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h3a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3h3a1 1 0 0 1 1 1v15h2V10a3 3 0 0 0-3-3h-3a3 3 0 0 0-3-3zm-1 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1zm4 12v-3h2v3h3v2h-3v3h-2v-3h-3v-2zm4 9a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6.789a7 7 0 0 1-3.117 5.824l-3.328 2.22a1 1 0 0 1-1.11 0l-3.328-2.22A7 7 0 0 1 27 34.79zm2 1v5.789a5 5 0 0 0 2.227 4.16L34 40.8l2.773-1.85A5 5 0 0 0 39 34.79V29zm4.707 7.707l4-4l-1.414-1.414L33 34.586l-1.293-1.293l-1.414 1.414l2 2a1 1 0 0 0 1.414 0" clipRule="evenodd" /></svg>
                <p>{entry.date} {entry.description}</p>
                <ul>
                    {entry.diagnosisCodes?.map((ee, ii) => (
                        <li key={ii}>
                            {ee} {diagnosis.find((eee) => (eee.code === ee))?.name}
                        </li>
                    ))}
                </ul>
                <p>diagnose by: {entry.specialist}</p>
                {entry.healthCheckRating === 0 ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="#12ff03" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z" /></svg>
                    :
                    entry.healthCheckRating === 1 ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="#f7fa3a" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z" /></svg>
                        :
                        entry.healthCheckRating === 2 ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="#fc1f1f" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z" /></svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="#0e0e0e" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z" /></svg>
                }
            </div>
        );
    case 'Hospital':
        return (
            <div style={cardStyle}>
                <p>{entry.type}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M19 30s-1.497-2.102-2-1.987c-5.404 1.23-11 4.782-11 8.557V42h36v-5.43c0-3.775-5.596-7.327-11-8.557c-.503-.115-2 1.987-2 1.987zm6.685 2H17.97l-.598-.84l-.01-.013l-.04-.055a16 16 0 0 0-.727-.915c-2.185.603-4.324 1.595-5.942 2.776C8.73 34.355 8 35.667 8 36.57V40h32v-3.43c0-.903-.73-2.215-2.652-3.617c-1.618-1.18-3.757-2.173-5.942-2.776l-.075.086a14 14 0 0 0-.652.828l-.04.056l-.01.012v.001l-.598.84z" /><path d="M32 38v-6h2v6z" /><path d="M36 36h-6v-2h6zM24 24a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0 2c5.523 0 10-4.477 10-10S29.523 6 24 6s-10 4.477-10 10s4.477 10 10 10" /></g></svg>
                <p>{entry.date} {entry.description}</p>
                <ul>
                    {entry.diagnosisCodes?.map((ee, ii) => (
                        <li key={ii}>
                            {ee} {diagnosis.find((eee) => (eee.code === ee))?.name}
                        </li>
                    ))}
                </ul>
                <p>diagnose by: {entry.specialist}</p>
                <p>Discharge</p>
                <p>Criteria: {entry.discharge.criteria}</p>
                <p>Date: {entry.discharge.date}</p>
            </div>
        );
    case 'OccupationalHealthcare':
        return (
            <div style={cardStyle}>
                <p>{entry.type}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="#fff0" d="M4 21q-.825 0-1.412-.587T2 19V8q0-.825.588-1.412T4 6h4V4q0-.825.588-1.412T10 2h4q.825 0 1.413.588T16 4v2h4q.825 0 1.413.588T22 8v11q0 .825-.587 1.413T20 21zm6-15h4V4h-4z" strokeWidth="1" stroke="#000" /></svg>
                <p>{entry.date} {entry.description}</p>
                <ul>
                    {entry.diagnosisCodes?.map((ee, ii) => (
                        <li key={ii}>
                            {ee} {diagnosis.find((eee) => (eee.code === ee))?.name}
                        </li>
                    ))}
                </ul>
                <p>diagnose by: {entry.specialist}</p>
                {entry.sickLeave ?
                    <>
                        <p>Sick leave</p>
                        <p>Start: {entry.sickLeave?.startDate}</p>
                        <p>End: {entry.sickLeave?.endDate}</p>
                    </>
                    : null}
            </div>
        );
    default:
        return assertNever(entry);
    }
};

const PatientPage = ({ patientId, diagnosis }: { patientId: string, diagnosis: Diagnosis[] }) => {
    const [formError, setFormError] = useState('');
    const [formOpen, setFormOpen] = useState(false);
    const [patient, setPatient] = useState<Patient | null | undefined>(undefined);

    useEffect(() => {
        patientServices
            .getPatient(patientId)
            .then((res) => {
                setPatient(res);
            });
    }, [patientId]);

    const handleAddEntry = (
        { date,
            description,
            diagnosisCodes,
            specialist,
            type,
            healthCheckRating,
            startDate,
            endDate,
            dischargeDate,
            criteria
        }: {
            date: string;
            description: string;
            diagnosisCodes: string;
            specialist: string;
            type: string;
            healthCheckRating?: string;
            startDate?: string;
            endDate?: string;
            dischargeDate?: string;
            criteria?: string;
        }) => {
        if (patient === null || patient === undefined) {
            setFormError('No patient');
            return;
        }
        try {
            let data: NewEntry;
            switch (type) {
            case 'HealthCheck':
                data = {
                    date,
                    description,
                    diagnosisCodes: diagnosisCodes.split(', '),
                    specialist,
                    type: 'HealthCheck',
                    healthCheckRating: z.nativeEnum(HealthCheckRating).parse(Number(healthCheckRating))
                };
                break;
            case 'OccupationalHealthcare':
                data = {
                    date,
                    description,
                    diagnosisCodes: diagnosisCodes.split(', '),
                    specialist,
                    type: 'OccupationalHealthcare',
                    sickLeave: {
                        startDate: z.string().parse(startDate),
                        endDate: z.string().parse(endDate)
                    }
                };
                break;
            case 'Hospital':
                data = {
                    date,
                    description,
                    diagnosisCodes: diagnosisCodes.split(', '),
                    specialist,
                    type: 'Hospital',
                    discharge: {
                        date: z.string().parse(dischargeDate),
                        criteria: z.string().parse(criteria)
                    }
                };
                break;
            default:
                throw new Error(`Unhandled discriminated union member: ${JSON.stringify(type)}`);
            }
            patientServices
                .createEntry(patientId, data)
                .then((res) => {
                    setPatient({
                        ...patient,
                        entries: patient.entries.concat(res)
                    });
                    setFormError('');
                    setFormOpen(false);
                })
                .catch((err: string) => {
                    setFormError(err);
                });
        }
        catch (err) {
            if (err instanceof ZodError) {
                setFormError(err.errors[0].message);
            }
        }

    };

    if (patient === undefined) return (
        <h2>...Loading</h2>
    );
    if (patient === null) return (
        <h2>no patient</h2>
    );
    return (
        <>
            <h2>{patient.name}</h2>
            {patient.gender === 'female' ?
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="currentColor" fillRule="evenodd" d="M38 18c0 7.396-5.735 13.452-13 13.965V37h5a1 1 0 1 1 0 2h-5v4a1 1 0 1 1-2 0v-4h-5a1 1 0 1 1 0-2h5v-5.035c-7.265-.513-13-6.57-13-13.965c0-7.732 6.268-14 14-14s14 6.268 14 14M24 30c6.627 0 12-5.373 12-12S30.627 6 24 6s-12 5.373-12 12s5.373 12 12 12" clipRule="evenodd" /></svg>
                : (
                    patient.gender === 'male' ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="currentColor" fillRule="evenodd" d="M30.5 7a1 1 0 0 1 1-1H42v10.5a1 1 0 1 1-2 0V9.414l-8.564 8.564A14.44 14.44 0 0 1 35 27.5C35 35.508 28.508 42 20.5 42S6 35.508 6 27.5S12.492 13 20.5 13c3.644 0 6.974 1.344 9.522 3.564L38.586 8H31.5a1 1 0 0 1-1-1m-10 33C27.404 40 33 34.404 33 27.5S27.404 15 20.5 15S8 20.596 8 27.5S13.596 40 20.5 40" clipRule="evenodd" /></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="currentColor" fillRule="evenodd" d="M12 9a1 1 0 1 0 0-2H8a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-1.586l5.753 5.753a1 1 0 0 0 .365.233A9.96 9.96 0 0 0 14 21c0 5.185 3.947 9.449 9 9.95v5.98h-2a1 1 0 1 0 0 2h2V41a1 1 0 1 0 2 0v-2.07h2a1 1 0 0 0 0-2h-2v-5.98c5.053-.501 9-4.765 9-9.95a9.96 9.96 0 0 0-1.073-4.511l2.104-2.091l1.43 1.43a1 1 0 0 0 1.414-1.415l-1.425-1.425L39 10.454V12a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1h-4a1 1 0 1 0 0 2h1.626l-2.59 2.574l-1.404-1.404a1 1 0 0 0-1.414 1.415l1.399 1.398l-1.796 1.785A9.98 9.98 0 0 0 24 11a9.98 9.98 0 0 0-7.82 3.766l-.013-.013L10.414 9zm12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16" clipRule="evenodd" /></svg>
                )
            }
            <p>born in: {patient.dateOfBirth}</p>
            <p>ssn: {patient.ssn}</p>
            <p>ocupation: {patient.occupation}</p>
            {patient.entries.map((e, i) => (
                <EntryComponent key={i} entry={e} diagnosis={diagnosis} />
            ))}
            <AddEntryModal modalOpen={formOpen} onClose={() => { setFormOpen(false); }} onSubmit={handleAddEntry} error={formError} diagnosis={diagnosis} />
            <Button variant="contained" onClick={() => setFormOpen(true)}>
                Add New Entry
            </Button>
        </>
    );
};

export default PatientPage;