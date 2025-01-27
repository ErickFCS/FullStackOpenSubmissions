import { useState } from "react";

const useInput = (type, name, placeholder) => {
    const [value, setValue] = useState('')
    const onChange = (event) => {
        setValue(event.target.value)
    }
    const reset = () => {
        setValue('')
    }
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
    }
}

export default useInput