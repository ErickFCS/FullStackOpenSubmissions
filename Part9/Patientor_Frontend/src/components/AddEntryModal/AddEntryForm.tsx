import { useState, SyntheticEvent } from 'react';

import { TextField, Grid, Button } from '@mui/material';

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
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [diagnosisCodes, setdiagnosisCodes] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [type, setType] = useState('');
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
            diagnosisCodes,
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
        setdiagnosisCodes('');
        setSpecialist('');
        setType('');
        setHealthCheckRating('');
    };

    return (
        <div>
            <form onSubmit={addEntry}>
                <TextField
                    label="Creation Date"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    label="Diagnosis Codes"
                    fullWidth
                    value={diagnosisCodes}
                    onChange={({ target }) => setdiagnosisCodes(target.value)}
                />
                <TextField
                    label="Specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <TextField
                    label="Entry Type"
                    fullWidth
                    value={type}
                    onChange={({ target }) => setType(target.value)}
                />
                {type === 'HealthCheck' ?
                    <TextField
                        label="Health Check Rating"
                        fullWidth
                        value={healthCheckRating}
                        onChange={({ target }) => setHealthCheckRating(target.value)}
                    />
                    : null}
                {type === 'OccupationalHealthcare' ?
                    <>
                        <TextField
                            label="Start date"
                            placeholder="YYYY-MM-DD"
                            fullWidth
                            value={startDate}
                            onChange={({ target }) => setStartDate(target.value)}
                        />
                        <TextField
                            label="End date"
                            placeholder="YYYY-MM-DD"
                            fullWidth
                            value={endDate}
                            onChange={({ target }) => setEndDate(target.value)}
                        />
                    </>
                    : null}
                {type === 'Hospital' ?
                    <>
                        <TextField
                            label="Discharge date"
                            placeholder="YYYY-MM-DD"
                            fullWidth
                            value={dischargeDate}
                            onChange={({ target }) => setDischargeDate(target.value)}
                        />
                        <TextField
                            label="Criteria"
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