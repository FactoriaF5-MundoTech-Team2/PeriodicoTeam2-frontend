import './RejectButton.scss'

const RejectButton = ({ onClick, isApproved }) => {
    return (
        <button className={`RejectButton ${isApproved ? 'approved' : ''}`} onClick={onClick} aria-pressed={isApproved}>
            <i className="bi bi-x-circle" aria-hidden="true"></i>
            Rechazar
        </button>
    )
}

export default RejectButton