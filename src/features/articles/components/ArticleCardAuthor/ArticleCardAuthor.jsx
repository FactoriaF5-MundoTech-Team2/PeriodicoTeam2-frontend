import './ArticleCardAuthor.scss'
import EditArticleButton from '../EditArticleButton/EditArticleButton'
import TagStatus from '../../../../components/Tag/TagStatus'

const ArticleCardAuthor = ({ article, onEdit }) => {
    return (
        <article className="ArticleCardAuthor">
            {article.imageUrl && (
                <img
                    className="ArticleCardAuthor__image"
                    src={article.imageUrl}
                    alt={article.title}
                />
            )}

            <div className="ArticleCardAuthor__body">
                <div className="ArticleCardAuthor__meta">
                    <time dateTime={article.publishDate}>
                        {new Date(article.publishDate).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                    <TagStatus status={article.status} />
                </div>

                <h2 className="ArticleCardAuthor__title">{article.title}</h2>
                <p className="ArticleCardAuthor__description">{article.content}</p>

                {article.status === 'DRAFT' && (
                    <div className="ArticleCardAuthor__actions">
                        <EditArticleButton onClick={onEdit} />
                    </div>
                )}
            </div>
        </article>
    )
}

export default ArticleCardAuthor