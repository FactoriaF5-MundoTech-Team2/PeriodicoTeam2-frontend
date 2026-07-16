import "./PublishButton.scss";

const PublishButton = ({ onClick, disabled = false }) => {
  return (
    <button
      type="button"
      aria-label="Publicar artículo"
      className="publishButton"
      onClick={onClick}
      disabled={disabled}
    >
      <i className="bi bi-upload" aria-hidden="true"></i>
      <span>Enviar a revisión</span>
    </button>
  );
};

export default PublishButton;
