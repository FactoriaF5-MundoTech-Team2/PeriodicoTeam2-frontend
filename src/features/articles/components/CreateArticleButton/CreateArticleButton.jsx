import './CreateArticleButton.scss'

const CreateArticleButton = ({ onClick, isApproved }) => {
    return (
        <button className={`CreateArticleButton ${isApproved ? 'approved' : ''}`} onClick={onClick} aria-pressed={isApproved}>
            <i className="bi bi-plus" aria-hidden="true"></i>
            Crear Artículo
        </button>
    )
}

export default CreateArticleButton