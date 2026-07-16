import './CardImage.scss'

const CardImage = ({
  icon = "bi bi-image",
  text = "Imagen pendiente de subir",
}) => {
  return (
    <div className="card-image" role="img" aria-label={text}>
      <i className={icon} aria-hidden="true"></i>
      <span>{text}</span>
    </div>
  );
};

export default CardImage;
