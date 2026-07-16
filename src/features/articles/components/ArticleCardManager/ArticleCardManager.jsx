import "./ArticleCardManager.scss";
import CardImage from "../../../../components/CardImage/CardImage";
import TagStatus from "../../../../components/Tag/TagStatus";

const API_BASE = import.meta.env.VITE_API_URL.replace("/api/v1", "");

const ArticleCardManager = ({ article, onClick }) => {
  return (
    <article className="ArticleCardManager" onClick={onClick}>
      {article.imageUrl ? (
        <img
          className="ArticleCardManager__image"
          src={`${API_BASE}${article.imageUrl}`}
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
            {new Date(article.publishDate).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <TagStatus status={article.status} />
        </div>

        <h2 className="ArticleCardManager__title">{article.title}</h2>
      </div>
    </article>
  );
};

export default ArticleCardManager;
