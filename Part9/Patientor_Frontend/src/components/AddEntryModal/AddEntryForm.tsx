import { useState, SyntheticEvent } from 'react';

import { Select, Grid, Button, Input, InputLabel, MenuItem } from '@mui/material';
import { Diagnosis } from '../../types';

interface Props {
    onCancel: () => void;
    onSubmit: (values: {
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
    }) => void;
    diagnosis: Diagnosis[]
}

const AddEntryForm = ({ onCancel, onSubmit, diagnosis }: Props) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [diagnosisCodes, setdiagnosisCodes] = useState<string[]>([]);
    const [specialist, setSpecialist] = useState('');
    const [type, setType] = useState('HealthCheck');
    // HealthCheck
    const [healthCheckRating, setHealthCheckRating] = useState('');
    // OccupationalHealthcare
    // ---Sick Leave
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    // Hospital
    // discharge
    const [dischargeDate, setDischargeDate] = useState('');
    const [criteria, setCriteria] = useState('');

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit({
            date,
            description,
            diagnosisCodes: diagnosisCodes.join(', '),
            specialist,
            type,
            healthCheckRating,
            startDate,
            endDate,
            dischargeDate,
            criteria,
        });
        setDate('');
        setDescription('');
        setdiagnosisCodes([]);
        setSpecialist('');
        setType('');
        setHealthCheckRating('');
    };

    return (
        <div>
            <form onSubmit={addEntry}>
                <InputLabel >Date of creation</InputLabel>
                <Input
                    type='date'
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <InputLabel>Description</InputLabel>
                <Input
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <InputLabel>Diagnosis Codes</InputLabel>
                <Select
                    multiple
                    value={diagnosisCodes}
                    onChange={({ target: { value } }) => setdiagnosisCodes(typeof value === 'string' ? value.split(',') : value)}
                >
                    {diagnosis.map((e) => (
                        <MenuItem
                            key={e.code}
                            value={e.code}
                        >
                            {e.name}
                        </MenuItem>
                    ))}
                </Select>
                <InputLabel>Specialist</InputLabel>
                <Input
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <InputLabel>Entry Type</InputLabel>
                <Select
                    value={type}
                    onChange={({ target }) => setType(target.value)}
                >
                    <MenuItem value='HealthCheck'>Health Check</MenuItem>
                    <MenuItem value='OccupationalHealthcare'>Occupational Healthcare</MenuItem>
                    <MenuItem value='Hospital'>Hospital</MenuItem>
                </Select>
                {type === 'HealthCheck' ?
                    <>
                        <InputLabel>Health Check Rating</InputLabel>
                        <Input
                            fullWidth
                            value={healthCheckRating}
                            onChange={({ target }) => setHealthCheckRating(target.value)}
                        />
                    </>
                    : null}
                {type === 'OccupationalHealthcare' ?
                    <>
                        <InputLabel>Start date</InputLabel>
                        <Input
                            type='date'
                            placeholder="YYYY-MM-DD"
                            fullWidth
                            value={startDate}
                            onChange={({ target }) => setStartDate(target.value)}
                        />
                        <InputLabel>End date</InputLabel>
                        <Input
                            type='date'
                            placeholder="YYYY-MM-DD"
                            fullWidth
                            value={endDate}
                            onChange={({ target }) => setEndDate(target.value)}
                        />
                    </>
                    : null}
                {type === 'Hospital' ?
                    <>
                        <InputLabel>Discharge date</InputLabel>
                        <Input
                            type='date'
                            placeholder="YYYY-MM-DD"
                            fullWidth
                            value={dischargeDate}
                            onChange={({ target }) => setDischargeDate(target.value)}
                        />
                        <InputLabel>Criteria</InputLabel>
                        <Input
                            fullWidth
                            value={criteria}
                            onChange={({ target }) => setCriteria(target.value)}
                        />
                    </>
                    : null}
                <Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{ float: 'left' }}
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{
                                float: 'right',
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddEntryForm;