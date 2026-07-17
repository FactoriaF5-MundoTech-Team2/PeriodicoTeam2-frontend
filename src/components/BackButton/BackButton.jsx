import './BackButton.scss'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button className="BackButton" onClick={() => navigate(-1)} type="button">
      <i className="bi bi-arrow-left" aria-hidden="true"></i>
      Volver atrás
    </button>
  )
}

export default BackButton