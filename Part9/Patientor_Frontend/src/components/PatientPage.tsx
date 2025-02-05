import { Patient } from '../types';
import { useEffect, useState } from 'react';
import patientServices from '../services/patients';


const PatientPage = ({ patientId }: { patientId: string | undefined }) => {
    const [patient, setPatient] = useState<Patient | null | undefined>(undefined)

    useEffect(() => {
        if (typeof patientId === 'undefined') return setPatient(null)
        patientServices
            .getPatient(patientId)
            .then((res) => {
                setPatient(res);
            })
    }, [patientId])

    if (patient === undefined) return (
        <h2>...Loading</h2>
    )
    if (patient === null) return (
        <h2>no patient</h2>
    )
    return (
        <>
            <h2>{patient.name}</h2>
            <p>{patient.gender}</p>
            <p>born in: {patient.dateOfBirth}</p>
            <p>ssn: {patient.ssn}</p>
            <p>ocupation: {patient.occupation}</p>
            {patient.entries.map((e, i) => (
                <div key={`div${i}`}>
                    <p key={`p${i}`}>{e.date} {e.description}</p>
                    <ul key={`ul${i}`}>
                        {e.diagnosisCodes?.map((ee, ii) => (
                            <li key={`${i}-${ii}`}>{ee}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    )
}

export default PatientPage;