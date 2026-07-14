import './DraftButton.scss'

const DraftButton = ({ onClick, isActive }) => {
    return (
        <button className={`DraftButton ${isActive ? 'active' : ''}`} onClick={onClick} aria-pressed={isActive}>
            <i className="bi bi-floppy" aria-hidden="true"></i>
            <span>Guardar como<br /> borrador</span>
        </button>
    )
}

export default DraftButton