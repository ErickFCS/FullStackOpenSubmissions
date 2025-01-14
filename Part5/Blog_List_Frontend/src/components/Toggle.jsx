import { useState } from 'react'

const Toggle = ({ showButtonText, hideButtonText, children }) => {
    const [isVisible, setIsVisible] = useState(false)
    const visibleWhenVisible = { display: isVisible ? 'block' : 'none' }
    const visibleWhenNoyVisible = { display: isVisible ? 'none' : 'block' }
    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }
    return (
        <>
            <div style={visibleWhenVisible}>
                {children}
            </div>
            <button style={visibleWhenVisible} onClick={toggleVisibility}>{hideButtonText}</button>
            <button style={visibleWhenNoyVisible} onClick={toggleVisibility}>{showButtonText}</button>
        </>
    )
}

export default Toggle