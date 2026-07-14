import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../../context/UserContext"
import "./RegisterPage.scss"

const ROLES = ["AUTHOR", "MANAGER"]

function RegisterPage() {
  const { register } = useUser()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    roles: []
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRoleToggle = (role) => {
    setForm(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (form.roles.length === 0) {
      setError("Selecciona al menos un rol")
      return
    }

    try {
      setLoading(true)
      const user = await register(form)
      if (user.roles?.includes("AUTHOR")) navigate("/author")
      else navigate("/manager")
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar usuario")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="RegisterPage">
      <div className="RegisterPage__card">
        <h1 className="RegisterPage__title">Crear cuenta</h1>

        <form className="RegisterPage__form" onSubmit={handleSubmit}>
          <div className="RegisterPage__field">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              required
            />
          </div>

          <div className="RegisterPage__field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="RegisterPage__field">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              required
            />
          </div>

          <div className="RegisterPage__field">
            <label>Rol</label>
            <div className="RegisterPage__roles">
              {ROLES.map(role => (
                <button
                  key={role}
                  type="button"
                  className={`RegisterPage__role ${form.roles.includes(role) ? "RegisterPage__role--active" : ""}`}
                  onClick={() => handleRoleToggle(role)}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="RegisterPage__error">{error}</p>}

          <button type="submit" className="RegisterPage__submit" disabled={loading}>
            {loading ? "Registrando..." : "Crear cuenta"}
          </button>
        </form>

        <p className="RegisterPage__login">
          Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage