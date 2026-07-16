import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DraftButton from "../DraftButton/DraftButton";
import PublishButton from "../PublishButton/PublishButton";
import Modal from "../../../../components/Modal/Modal";
import "./ArticleForm.scss";
import { useUser } from "../../../../context/UserContext";
import * as articleService from "../../services/articleService";
import api from "../../../../api";
import BackButton from "../../../../components/BackButton/BackButton";

const ArticleForm = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const [form, setForm] = useState({
    title: "",
    image: null,
    sections: [{ subtitle: "", content: "" }],
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");
  const fileInputRef = useRef(null);
  const { currentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditing) return;
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/articles/${id}`);
        setForm({
          title: res.data.title,
          sections: JSON.parse(
            res.data.content || '[{"subtitle":"","content":""}]',
          ),
          image: null,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      setToast("La imagen no puede superar 10MB")
      setTimeout(() => setToast(""), 3000 )
      return
    }
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleDraft = async () => {
    setLoading(true);
    try {
      const body = {
        title: form.title,
        content: JSON.stringify(form.sections),
        publishDate: new Date().toISOString().split("T")[0],
        authorId: currentUser?.id,
      };
      let article;
      if (isEditing) {
        article = await articleService.updateArticle(id, body, currentUser?.id);
      } else {
        article = await articleService.createArticle(body);
      }
      if (form.image) {
        await articleService.uploadImage(article.id, form.image);
      }
      setToast("Borrador guardado correctamente");
      setTimeout(() => navigate("/author"), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPublish = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      const body = {
        title: form.title,
        content: JSON.stringify(form.sections), // ← serializa el array
        publishDate: new Date().toISOString().split("T")[0],
        authorId: currentUser?.id,
      };
      let article;
      if (isEditing) {
        article = await articleService.updateArticle(id, body, currentUser?.id);
      } else {
        article = await articleService.createArticle(body);
      }
      if (form.image) {
        await articleService.uploadImage(article.id, form.image);
      }
      await articleService.submitForReview(article.id, currentUser?.id);
      navigate("/author");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addSection = () => {
    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, { subtitle: "", content: "" }],
    }));
  };

  const updateSection = (index, field, value) => {
    setForm((prev) => {
      const sections = [...prev.sections];
      sections[index] = { ...sections[index], [field]: value };
      return { ...prev, sections };
    });
  };

  const removeSection = (index) => {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="ArticleForm">
      <BackButton/>
      <h1 className="ArticleForm__title">
        {isEditing ? "Editar artículo" : "Nuevo artículo"}
      </h1>

      {toast && (
        <div className="ArticleForm__toast">
          <i className="bi bi-check-circle"></i>
          {toast}
        </div>
      )}

      {showModal && (
        <Modal
          message="¿Estás seguro/a de que quieres enviar este artículo a revisión del manager? Esta acción no se puede deshacer."
          onConfirm={handleConfirmPublish}
          onCancel={() => setShowModal(false)}
        />
      )}

      <form className="ArticleForm__form">
        <div className="ArticleForm__field">
          <label htmlFor="title" className="title__label">
            Título del artículo
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Escribe un titular llamativo..."
            className="ArticleForm__input-title"
          />
        </div>

        <div className="ArticleForm__field">
          <label className="title__label">Imagen de portada
            <span className="ArticleForm__hint">Máx. 10MB</span>
          </label>
          <div
            className="ArticleForm__upload"
            role="button"
            tabIndex={0}
            onClick={handleImageClick}
            onKeyDown={(e) => e.key === "Enter" && handleImageClick()}
          >
            <i className="bi bi-camera" aria-hidden="true"></i>
            <p>
              {form.image
                ? form.image.name
                : "Suelta tu imagen aquí, o busca una"}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </div>
        </div>

        {form.sections.map((section, index) => (
          <div key={index} className="ArticleForm__section">
            <h3 className="ArticleForm__sectionTitle">Sección {index + 1}</h3>

            <div className="ArticleForm__field">
              <label>Subtítulo artículo</label>
              <input
                type="text"
                name="subtitle"
                value={section.subtitle}
                onChange={(e) =>
                  updateSection(index, "subtitle", e.target.value)
                }
                placeholder="Ponle un subtítulo..."
                className="ArticleForm__input"
              />
            </div>

            <div className="ArticleForm__field">
              <label>Contenido del artículo</label>
              <textarea
                name="content"
                value={section.content}
                onChange={(e) =>
                  updateSection(index, "content", e.target.value)
                }
                placeholder="Escribe tu artículo..."
                rows={6}
                className="content__textarea"
              />
            </div>

            {form.sections.length > 1 && (
              <button
                type="button"
                className="ArticleForm__removeSection"
                onClick={() => removeSection(index)}
              >
                Eliminar sección
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="ArticleForm__addSection"
          onClick={addSection}
        >
          + Añadir sección
        </button>
      </form>

      <hr className="ArticleForm__divider" />

      <div className="ArticleForm__actions">
        <DraftButton onClick={handleDraft} disabled={loading} />
        <PublishButton onClick={() => setShowModal(true)} disabled={loading} />
      </div>
    </div>
  );
};

export default ArticleForm;
