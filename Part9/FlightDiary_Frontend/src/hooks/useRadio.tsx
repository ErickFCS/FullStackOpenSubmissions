import { useState } from 'react';
export type FormCheckType = 'checkbox' | 'radio' | 'switch';
const useInput = (name: string, inline: boolean) => {
    const [value, setValue] = useState('');
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.nextSibling?.textContent || '');
    };
    const reset = () => { };
    return {
        value,
        type: 'radio' as FormCheckType,
        name,
        inline,
        onChange,
        reset,
        setValue,
        values: {
            type: 'radio' as FormCheckType,
            name,
            inline,
            onChange
        }
    };
};

export default useInput;