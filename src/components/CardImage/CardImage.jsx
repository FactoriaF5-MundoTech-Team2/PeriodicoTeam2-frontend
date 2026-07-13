import './CardImage.scss'

const CardImage = ({ icon = 'bi bi-image', text = 'Imagen pendiente de subir' }) => {
  return (
    <div className="card-image">
      <i className={icon}></i>
      <span>{text}</span>
    </div>
  )
}

export default CardImage