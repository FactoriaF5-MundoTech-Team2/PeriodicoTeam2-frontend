import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useUser } from "../../../../context/UserContext"
import "./LoginPage.scss"

function LoginPage() {
  const { login } = useUser()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      setLoading(true)
      const user = await login(form)
      if (user.roles?.includes("AUTHOR")) navigate("/author")
      else navigate("/manager")
    } catch (err) {
      setError(err.response?.data?.message || "Email o contraseña incorrectos")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="LoginPage">
      <div className="LoginPage__card">
        <h1 className="LoginPage__title">Iniciar sesión</h1>

        <form className="LoginPage__form" onSubmit={handleSubmit}>
          <div className="LoginPage__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
              aria-label="Correo electrónico"
            />
          </div>

          <div className="LoginPage__field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              required
              aria-label="Contraseña"
            />
          </div>

          {error && <p className="LoginPage__error">{error}</p>}

          <button type="submit" className="LoginPage__submit" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="LoginPage__register">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage