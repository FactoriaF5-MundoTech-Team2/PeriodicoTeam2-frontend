import "./ArticleCardAuthor.scss";
import EditArticleButton from "../EditArticleButton/EditArticleButton";
import TagStatus from "../../../../components/Tag/TagStatus";
import CardImage from "../../../../components/CardImage/CardImage";
import DeleteButton from "../DeleteButton/DeleteButton"

const API_BASE = import.meta.env.VITE_API_URL.replace("/api/v1", "");
const ArticleCardAuthor = ({ article, onEdit, onDelete, onClick }) => {
  return (
    <article className="ArticleCardAuthor" onClick={onClick}>
      {article.imageUrl ? (
        <img
          className="ArticleCardAuthor__image"
          src={`${API_BASE}${article.imageUrl}`}
          alt={article.title}
        />
      ) : (
        <CardImage />
      )}

      <div className="ArticleCardAuthor__body">
        <div className="ArticleCardAuthor__meta">
          <time dateTime={article.publishDate}>
            {new Date(article.publishDate).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <TagStatus status={article.status} />
        </div>

        <h2 className="ArticleCardAuthor__title">{article.title}</h2>

        {article.status === "DRAFT" && (
          <div className="ArticleCardAuthor__actions">
            <EditArticleButton onClick={(e) => { e.stopPropagation(); onEdit() }} />
            <DeleteButton iconOnly onClick={(e) => { e.stopPropagation(); onDelete() }} />
          </div>
        )}
      </div>
    </article>
  );
};

export default ArticleCardAuthor;
