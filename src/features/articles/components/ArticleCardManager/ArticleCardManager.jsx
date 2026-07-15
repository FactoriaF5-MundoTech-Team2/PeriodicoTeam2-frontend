import './ArticleCardManager.scss'
import CardImage from '../../../../components/CardImage/CardImage'
import TagStatus from '../../../../components/Tag/TagStatus'

const ArticleCardManager = ({ article }) => {
  return (
    <article className="ArticleCardManager">
      {article.image ? (
        <img
          className="ArticleCardManager__image"
          src={article.image}
          alt={article.title}
        />
      ) : (
        <CardImage />
      )}

      <div className="ArticleCardManager__body">
        <p className="ArticleCardManager__author">
          <i className="bi bi-person" aria-hidden="true"></i>
          {article.authorName}
        </p>

        <div className="ArticleCardManager__meta">
          <time dateTime={article.createdAt}>
            {new Date(article.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <TagStatus status={article.status} />
        </div>

        <h2 className="ArticleCardManager__title">{article.title}</h2>
        <p className="ArticleCardManager__description">{article.description}</p>

      </div>
    </article>
  )
}

export default ArticleCardManager