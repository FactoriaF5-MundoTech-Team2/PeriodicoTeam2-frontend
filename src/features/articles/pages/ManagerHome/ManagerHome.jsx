import { useState, useMemo } from "react";
import ArticleCardManager from "../../components/ArticleCardManager/ArticleCardManager";
import CounterTag from "../../components/CounterTag/CounterTag";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./ManagerHome.scss";

const mockArticles = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/1200x/c9/59/6e/c9596e1969e329ad1bf316bddbd81d92.jpg",
    title: "Plantas suculentas",
    authorName: "Nayeli Córdova Mendoza",
    createdAt: "2023-10-24",
    description:
      "HADUDASHDUHASUudfushfushfusofudhfushoufhushfouhfousdhfusdhfsdksjffsfjsfjklfklsdfjlfjdfjklsdfjdsfjlksdfjklsdfjksljhfjsdhffjksjfhfhksj kjhsdfkjhskjfhfhdkfjhsdfkjsfhdkfjhskfjhdkjfhkfjhdfkjhfjdshjkfsdkhf jkdfjkhsfkjhdfkjshfkhfhsdjkfhjkdhfj dfjlkdfjdsfjklfjlkdfjlskfsgjkjñagjshgsafghfbgshhgdfvdgfvkdfvsdkhgsdfjsdgfd hsdfshdgfhsdfhsgfhjdgfs dshgfhdsgfhsfgohdsfiushpfhsdfudshfui.",
    status: "IN_REVIEW",
  },
  {
    id: 2,
    image: null,
    title: "Título",
    authorName: "Autor",
    createdAt: "2023-10-24",
    description: "Contenido artículo.",
    status: "IN_REVIEW",
  },
  {
    id: 3,
    image: null,
    title: "Título",
    authorName: "Autor",
    createdAt: "2023-10-24",
    description: "Contenido artículo.",
    status: "IN_REVIEW",
  },
];

const ManagerHome = () => {
  const [articles] = useState(mockArticles);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const term = searchTerm.toLowerCase();
        return (
          article.title.toLowerCase().includes(term) ||
          article.authorName.toLowerCase().includes(term)
        );
      }),
    [articles, searchTerm],
  );

  const inReviewCount = useMemo(
    () => articles.filter((a) => a.status === "IN_REVIEW").length,
    [articles],
  );

  const handleApprove = (id) => {
    // pendiente: conectar con la API para marcar como PUBLISHED
    console.log("aprobar", id);
  };

  const handleReject = (id) => {
    // pendiente: conectar con la API para marcar como DRAFT o eliminar
    console.log("rechazar", id);
  };

  return (
    <div className="managerHome">
      <div>
        <h1 className="manager__title">Panel del manager</h1>
        <p className="manager__paragraph">
          Gestiona los artículos publicados y los artículos en proceso de
          revisión.
        </p>
      </div>

      <SearchBar onSearch={setSearchTerm} />

      <CounterTag count={inReviewCount} label="" />

      <div className="articleList">
        {filteredArticles.map((article) => (
          <ArticleCardManager
            key={article.id}
            article={article}
            onApprove={() => handleApprove(article.id)}
            onReject={() => handleReject(article.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ManagerHome;
