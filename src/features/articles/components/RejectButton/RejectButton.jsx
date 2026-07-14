import { useState } from 'react'
import { rejectArticle } from '../../../services/articleService'
import styles from './RejectButton.module.scss'

function RejectButton({ articleId, managerId, onRejectSuccess }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleReject = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const updatedArticle = await rejectArticle(articleId, managerId)
      onRejectSuccess(updatedArticle)
    } catch (err) {
      setError('No se pudo rechazar el artículo. Verifica tu rol.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        className={styles.rejectButton}
        onClick={handleReject}
        disabled={isLoading}
        aria-label={`Rechazar artículo ${articleId}`}
      >
        <svg
          className={styles.icon}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="9" y1="9" x2="15" y2="15" />
          <line x1="15" y1="9" x2="9" y2="15" />
        </svg>
        {isLoading ? 'Rechazando...' : 'Rechazar'}
      </button>
      {error && (
        <p className={styles.errorMessage} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default RejectButton