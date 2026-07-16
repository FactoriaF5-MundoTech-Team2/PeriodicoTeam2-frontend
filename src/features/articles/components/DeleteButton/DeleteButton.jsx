import './DeleteButton.scss'

const DeleteButton = ({ onClick, isApproved, iconOnly }) => {
    return (
        <button className={`DeleteButton ${isApproved ? 'approved' : ''} ${iconOnly ? 'DeleteButton--iconOnly' : ''}`} onClick={onClick}>
            <i className="bi bi-trash" aria-hidden="true"></i>
            <span className="DeleteButton__text">Borrar mi cuenta</span>
        </button>
    )
}

export default DeleteButton