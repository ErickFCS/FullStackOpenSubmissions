const Message = ({ message, error }) => {
    if (!message && !error)  return
    const className = message ? 'alertMessage' : 'alertError'
    return (
        <p className={className}>
            {message || error}
        </p>
    )
}

export default Message