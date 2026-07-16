import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '../../../../context/UserContext'
import * as articleService from '../../services/articleService'
import Modal from '../../../../components/Modal/Modal'
import './ArticleDetail.scss'
import RejectButton from '../../components/RejectButton/RejectButton'
import ApproveButton from '../../components/ApproveButton/ApproveButton'

const API_BASE = import.meta.env.VITE_API_URL.replace('/api/v1', '')

const ArticleDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser, hasRole } = useUser()
  const [article, setArticle] = useState(null)
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // 'approve' | 'reject' | null

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await articleService.getArticleById(id)
        setArticle(data)
        try {
          setSections(JSON.parse(data.content))
        } catch {
          setSections([{ subtitle: '', content: data.content }])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  const handleApprove = async () => {
    await articleService.approveArticle(id, currentUser.id)
    setModal(null)
    navigate('/manager')
  }

  const handleReject = async () => {
    await articleService.rejectArticle(id, currentUser.id)
    setModal(null)
    navigate('/manager')
  }

  if (loading) return <p>Cargando...</p>
  if (!article) return <p>Artículo no encontrado.</p>

  return (
    <div className="ArticleDetail">
      {modal === 'approve' && (
        <Modal
          message="¿Confirmas que quieres publicar este artículo?"
          onConfirm={handleApprove}
          onCancel={() => setModal(null)}
        />
      )}
      {modal === 'reject' && (
        <Modal
          message="¿Confirmas que quieres rechazar este artículo? Volverá a estado borrador."
          onConfirm={handleReject}
          onCancel={() => setModal(null)}
        />
      )}

      {article.imageUrl && (
        <div className="ArticleDetail__cover">
          <img src={`${API_BASE}${article.imageUrl}`} alt={article.title} />
        </div>
      )}

      <div className="ArticleDetail__body">
        <div className="ArticleDetail__meta">
          <span className="ArticleDetail__author">{article.authorName}</span>
          <time>{new Date(article.publishDate).toLocaleDateString('es-ES', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}</time>
        </div>

        <h1 className="ArticleDetail__title">{article.title}</h1>

        {sections.map((section, index) => (
          <div key={index} className="ArticleDetail__section">
            {section.subtitle && (
              <h2 className="ArticleDetail__subtitle">{section.subtitle}</h2>
            )}
            <p className="ArticleDetail__content">{section.content}</p>
          </div>
        ))}

        {hasRole('MANAGER') && article.status === 'IN_REVIEW' && (
          <div className="ArticleDetail__actions">
            <RejectButton onClick={() => setModal('reject')}/>
            <ApproveButton onClick={() => setModal('approve')}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticleDetail