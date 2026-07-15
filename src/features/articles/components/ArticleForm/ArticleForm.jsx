import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import DraftButton from "../DraftButton/DraftButton"
import PublishButton from "../PublishButton/PublishButton"
import Modal from "../../../../components/Modal/Modal"
import "./ArticleForm.scss"
import { useUser } from "../../../../context/UserContext"
import * as articleService from "../../services/articleService"

const ArticleForm = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
  })
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const fileInputRef = useRef(null)
  const { currentUser } = useUser()
  const navigate = useNavigate()
  const [toast, setToast] = useState("")

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImageClick = () => fileInputRef.current?.click()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) setForm((prev) => ({ ...prev, image: file }))
  }

  const handleDraft = async () => {
    setLoading(true)
    try {
      const body = {
        title: form.title,
        content: form.content,
        publishDate: new Date().toISOString().split("T")[0],
        authorId: currentUser?.id,
      }
      await articleService.createArticle(body)
      setToast("Borrador guardado correctamente")
      setTimeout(() => navigate('/author'), 2000)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmPublish = async () => {
    console.log("currentUser al publicar: ", currentUser)
    setShowModal(false)
    setLoading(true)
    try {
      const body = {
        title: form.title,
        content: form.content,
        publishDate: new Date().toISOString().split("T")[0],
        authorId: currentUser?.id,
      }
      const article = await articleService.createArticle(body)
      await articleService.submitForReview(article.id, currentUser?.id)
      navigate('/author')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ArticleForm">
      <h1 className="ArticleForm__title">Nuevo artículo</h1>
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
          <label htmlFor="title" className="title__label">Título del artículo</label>
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
          <label className="title__label">Imagen de portada</label>
          <div
            className="ArticleForm__upload"
            role="button"
            tabIndex={0}
            onClick={handleImageClick}
            onKeyDown={(e) => e.key === "Enter" && handleImageClick()}
          >
            <i className="bi bi-camera" aria-hidden="true"></i>
            <p>{form.image ? form.image.name : "Suelta tu imagen aquí, o busca una"}</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </div>
        </div>

        <div className="ArticleForm__field">
          <label htmlFor="content" className="title__label">Contenido del artículo</label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Comienza a escribir tu artículo..."
            rows={10}
            className="content__textarea"
          />
        </div>
      </form>

      <hr className="ArticleForm__divider" />

      <div className="ArticleForm__actions">
        <DraftButton onClick={handleDraft} disabled={loading} />
        <PublishButton onClick={() => setShowModal(true)} disabled={loading} />
      </div>
    </div>
  )
}

export default ArticleForm