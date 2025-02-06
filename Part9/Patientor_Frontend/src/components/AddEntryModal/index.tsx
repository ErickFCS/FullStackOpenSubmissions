import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import AddEntryForm from './AddEntryForm';

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
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new patient</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <AddEntryForm onCancel={onClose} onSubmit={onSubmit} />
        </DialogContent>
    </Dialog>
);

export default AddEntryModal;
