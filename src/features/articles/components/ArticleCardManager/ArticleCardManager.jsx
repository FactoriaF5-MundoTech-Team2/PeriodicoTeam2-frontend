import './ArticleCardManager.scss'
import CardImage from '../../../../components/CardImage/CardImage'
import TagStatus from '../../../../components/Tag/TagStatus'

const ArticleCardManager = ({ article }) => {
  return (
    <article className="ArticleCardManager">
      {article.imageUrl ? (
        <img
          className="ArticleCardManager__image"
          src={article.imageUrl}
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
          <time dateTime={article.publishDate}>
            {new Date(article.publishDate).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <TagStatus status={article.status} />
        </div>

        <h2 className="ArticleCardManager__title">{article.title}</h2>
        <p className="ArticleCardManager__description">{article.content}</p>

      </div>
    </article>
  )
}

export default ArticleCardManager