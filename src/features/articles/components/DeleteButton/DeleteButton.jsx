import './DeleteButton.scss'

const DeleteButton = ({ onClick, isApproved }) => {
    return (
        <button className={`DeleteButton ${isApproved ? 'approved' : ''}`} onClick={onClick} aria-pressed={isApproved}>
            <i className="bi bi-trash" aria-hidden="true"></i>
            Borrar mi cuenta
        </button>
    )
}

export default DeleteButton