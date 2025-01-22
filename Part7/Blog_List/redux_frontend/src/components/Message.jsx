import Alert from 'react-bootstrap/Alert'

const Message = ({ message, error }) => {
    if (!message && !error) return
    const variant = message ? 'success' : 'warning'
    return <Alert variant={variant}>{message || error}</Alert>
}

export default Message
