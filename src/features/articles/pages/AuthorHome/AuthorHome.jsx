import './AuthorHome.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../../../context/UserContext'
import { getArticlesByAuthor } from '../../services/articleService'
import { deleteArticle } from '../../services/articleService'
import ArticleCardAuthor from '../../components/ArticleCardAuthor/ArticleCardAuthor'
import FilterButton from '../../components/FilterButton/FilterButton'
import CreateArticleButton from '../../components/CreateArticleButton/CreateArticleButton'

const AuthorHome = () => {
  const { currentUser } = useUser()
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [activeStatus, setActiveStatus] = useState('')
  const [loading, setLoading] = useState(true)

  const handleDelete = async (articleId) => {
    if (!window.confirm("'¿Seguro que quieres eliminar este artículo? Esta acción no se puede deshacer'")) return
    try {
      await deleteArticle(articleId, currentUser.id)
      setArticles(prev => prev.filter(a => a.id !== articleId))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!currentUser) return
    const fetchArticles = async () => {
      try {
        const data = await getArticlesByAuthor(currentUser.id)
        setArticles(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [currentUser])

  const filteredArticles = articles
    .filter(a => !activeStatus || a.status === activeStatus)

  return (
    <div className="AuthorHome">
      <div className="AuthorHome__header">
        <h1>Panel del autor/a</h1>
        <p>Gestiona tus artículos publicados, los borradores y los artículos en proceso de revisión.</p>
      </div>

      <div className="AuthorHome__actions">
        <FilterButton onFilter={setActiveStatus} activeStatus={activeStatus} />
        <CreateArticleButton onClick={() => navigate('/articles/new')} />
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : filteredArticles.length === 0 ? (
        <p>No tienes artículos todavía.</p>
      ) : (
        <div className="AuthorHome__list">
          {filteredArticles.map(article => (
            <ArticleCardAuthor
              key={article.id}
              article={article}
              onEdit={() => navigate(`/articles/edit/${article.id}`)}
              onDelete={() => handleDelete(article.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default AuthorHome