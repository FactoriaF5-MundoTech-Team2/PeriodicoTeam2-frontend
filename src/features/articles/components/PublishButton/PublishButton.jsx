import './PublishButton.scss'

const PublishButton = ({ onClick, disabled = false }) => {
  return (
    <button
      className="publishButton" onClick={onClick} disabled={disabled}>
      <i className="bi bi-upload"></i>
      <span>Publicar</span>
    </button>
  );
};

export default PublishButton;