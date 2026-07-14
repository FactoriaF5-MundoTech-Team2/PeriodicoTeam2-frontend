import './ApproveButton.scss'

const ApproveButton = ({ onClick, isApproved }) => {
    return (
        <button className={`ApproveButton ${isApproved ? 'approved' : ''}`} onClick={onClick} aria-pressed={isApproved}>
            <i className="bi bi-check-circle" aria-hidden="true"></i>
            Aprobar
        </button>
    )
}

export default ApproveButton