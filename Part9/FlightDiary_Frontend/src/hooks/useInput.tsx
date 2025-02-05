import { useState } from 'react';
type FormControlElement = HTMLInputElement | HTMLTextAreaElement;
const useInput = (type: string, name: string, placeholder: string) => {
    const [value, setValue] = useState('');
    const onChange = (event: React.ChangeEvent<FormControlElement>) => {
        setValue(event.currentTarget.value);
    };
    const reset = () => {
        setValue('');
    };
    return {
        value,
        type,
        name,
        placeholder,
        onChange,
        reset,
        setValue,
        values: {
            value,
            type,
            name,
            placeholder,
            onChange
        }
    };
};

export default useInput;