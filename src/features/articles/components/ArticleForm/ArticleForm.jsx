import { useState, useRef } from "react"
import DraftButton from "../DraftButton/DraftButton"
import PublishButton from "../PublishButton/PublishButton"
import "./ArticleForm.scss"
import { useUser } from "../../../../context/UserContext"
import * as articleService from "../../services/articleService"

const ArticleForm = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    quote: "",
    quoteAuthor: "",
    image: null,
  })
  const fileInputRef = useRef(null)

  const { currentUser } = useUser()
const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImageClick = () => fileInputRef.current?.click()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) setForm((prev) => ({ ...prev, image: file }))
  }

  const handlePublish = async () => {
  setLoading(true)
  try {
    const body = {
      title: form.title,
      content: form.content,
      publishDate: new Date().toISOString().split("T")[0],
      authorId: currentUser?.id,
    }
    await articleService.create(body)
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
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
    await articleService.create(body)
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="ArticleForm">
      <h1 className="ArticleForm__title">Nuevo artículo</h1>

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
            aria-label="Título del artículo"
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
            aria-label="Subir imagen de portada"
          >
            <i className="bi bi-camera" aria-hidden="true"></i>
            <p>{form.image ? form.image.name : "Suelta tu imagen aquí, o busca una"}</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
              aria-hidden="true"
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
            aria-label="Contenido del artículo"
            className="content__textarea"
          />
        </div>
      </form>

      <hr className="ArticleForm__divider" />

      <div className="ArticleForm__actions">
        <DraftButton onClick={handleDraft} disabled={loading} />
        <PublishButton onClick={handlePublish} disabled={loading} />
      </div>
    </div>
  )
}

export default ArticleForm