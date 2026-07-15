import './ArticleCardAuthor.scss'
import EditArticleButton from '../EditArticleButton/EditArticleButton'

const ArticleCardAuthor = ({ article, onApprove, onReject }) => {
    return (
        <article className="ArticleCardAuthor">
            <img
            className="ArticleCardAuthor__image"
            src={article.image}
            alt={article.title}
            />

            <div className="ArticleCardAuthor__body">
                <p className="ArticleCardAuthor__author">
                    <i className="bi bi-person" aria-hidden="true">
                        {article.authorName}
                    </i>
                </p>

                <div className="ArticleCardAuthor__meta">
                    <time dateTime={article.createdAt}>
                        {new Date(article.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                    <CounterTag status={article.status} />
                </div>
                <h2 className="ArticleCardAuthor__title">{article.title}</h2>
                <p className="ArticleCardAuthor__description">{article.description}</p>

                <div className="ArticleCardAuthor__actions">
                    <EditArticleButton onClick={onApprove}/>
                </div>
            </div>
            
        </article>
    )
}

export default ArticleCardAuthor