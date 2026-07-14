import './ArticleCardManager.scss'
import CounterTag from '../CounterTag/CounterTag'
import ApproveButton from '../ApproveButton/ApproveButton'
import RejectButton from '../RejectButton/RejectButton'

const ArticleCardManager = ({ article, onApprove, onReject }) => {
    return (
        <article className="ArticleCardManager">
            <img
            className="ArticleCardManager__image"
            src={article.image}
            alt={article.title}
            />

            <div className="ArticleCardManager__body">
                <p className="ArticleCardManager__author">
                    <i className="bi bi-person" aria-hidden="true">
                        {article.authorName}
                    </i>
                </p>

                <div className="ArticleCardManager__meta">
                    <time dateTime={article.createdAt}>
                        {new Date(article.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                    <CounterTag status={article.status} />
                </div>
                <h2 className="ArticleCardManager__title">{article.title}</h2>
                <p className="ArticleCardManager__description">{article.description}</p>

                <div className="ArticleCardManager__actions">
                    <ApproveButton onClick={onApprove}/>
                    <RejectButton onClick={onReject} />
                </div>
            </div>
            
        </article>
    )
}

export default ArticleCardManager