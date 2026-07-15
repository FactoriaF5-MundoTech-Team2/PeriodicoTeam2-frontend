<<<<<<< HEAD
import "./RejectButton.scss";

function RejectButton({ articleId, onReject }) {
  return (
    <button
      type="button"
      className="btn w-100 w-md-auto gap-2 reject-button"
      onClick={onReject}
      aria-label={`Rechazar artículo ${articleId}`}
    >
      <i className="bi bi-x-circle" aria-hidden="true"></i>
      Rechazar
    </button>
  );
}

export default RejectButton;
=======
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
>>>>>>> dev
