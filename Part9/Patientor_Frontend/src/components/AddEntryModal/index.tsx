import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import AddEntryForm from './AddEntryForm';
import { Diagnosis } from '../../types';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
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
    error?: string;
    diagnosis: Diagnosis[]
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnosis }: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new patient</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <AddEntryForm onCancel={onClose} onSubmit={onSubmit} diagnosis={diagnosis} />
        </DialogContent>
    </Dialog>
);

export default AddEntryModal;
