import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArticleCardManager from "../../components/ArticleCardManager/ArticleCardManager";
import CounterTag from "../../components/CounterTag/CounterTag";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getArticlesByStatus } from "../../services/articleService";
import "./ManagerHome.scss";

const ManagerHome = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticlesByStatus("IN_REVIEW");
        setArticles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const term = searchTerm.toLowerCase();
        return (
          article.title.toLowerCase().includes(term) ||
          article.authorName.toLowerCase().includes(term)
        );
      }),
    [articles, searchTerm]
  );

  return (
    <div className="managerHome">
      <div>
        <h1 className="manager__title">Panel del manager</h1>
        <p className="manager__paragraph">
          Gestiona los artículos en proceso de revisión.
        </p>
      </div>

      <SearchBar onSearch={setSearchTerm} />
      <CounterTag count={filteredArticles.length} label="" />

      {loading ? (
        <p>Cargando...</p>
      ) : filteredArticles.length === 0 ? (
        <p>No hay artículos en revisión.</p>
      ) : (
        <div className="articleList">
          {filteredArticles.map((article) => (
            <ArticleCardManager
              key={article.id}
              article={article}
              onClick={() => navigate(`/articles/${article.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagerHome;