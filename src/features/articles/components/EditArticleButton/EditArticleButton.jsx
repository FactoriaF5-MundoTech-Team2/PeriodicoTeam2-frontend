import './EditArticleButton.scss'

const EditArticleButton = ({ onClick, isApproved }) => {
    return (
        <button className={`EditArticleButton ${isApproved ? 'approved' : ''}`} onClick={onClick} aria-pressed={isApproved}>
            <i className="bi bi-pencil" aria-hidden="true"></i>
            Editar Artículo
        </button>
    )
}

export default EditArticleButton