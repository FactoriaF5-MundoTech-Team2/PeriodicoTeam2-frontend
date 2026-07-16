import "./AuthorHome.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext";
import { getArticlesByAuthor } from "../../services/articleService";
import { deleteArticle } from "../../services/articleService";
import ArticleCardAuthor from "../../components/ArticleCardAuthor/ArticleCardAuthor";
import FilterButton from "../../components/FilterButton/FilterButton";
import CreateArticleButton from "../../components/CreateArticleButton/CreateArticleButton";
import Modal from "../../../../components/Modal/Modal";

const AuthorHome = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [activeStatus, setActiveStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const handleRequestDelete = (articleId) => {
    setPendingDeleteId(articleId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      await deleteArticle(pendingDeleteId, currentUser.id);
      setArticles((prev) => prev.filter((a) => a.id !== pendingDeleteId));
      setShowModal(false);
      setPendingDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    const fetchArticles = async () => {
      try {
        const data = await getArticlesByAuthor(currentUser.id);
        setArticles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [currentUser]);

  const filteredArticles = articles.filter(
    (a) => !activeStatus || a.status === activeStatus,
  );

  return (
    <>
      {showModal && (
        <Modal
          message="¿Seguro que quieres eliminar este artículo? Esta acción no se puede deshacer"
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setShowModal(false);
            setPendingDeleteId(null);
          }}
        />
      )}

      <div className="AuthorHome">
        <div className="AuthorHome__header">
          <h1>Panel del autor/a</h1>
          <p>
            Gestiona tus artículos publicados, los borradores y los artículos en
            proceso de revisión.
          </p>
        </div>

        <div className="AuthorHome__actions">
          <FilterButton
            onFilter={setActiveStatus}
            activeStatus={activeStatus}
          />
          <CreateArticleButton onClick={() => navigate("/articles/new")} />
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : filteredArticles.length === 0 ? (
          <p>No tienes artículos todavía.</p>
        ) : (
          <div className="AuthorHome__list">
            {filteredArticles.map((article) => (
              <ArticleCardAuthor
                key={article.id}
                article={article}
                onEdit={() => navigate(`/articles/edit/${article.id}`)}
                onDelete={() => handleRequestDelete(article.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AuthorHome;
