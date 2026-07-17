import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext"
import { deleteUser } from "../../services/userService"
import Modal from "../../../../components/Modal/Modal"
import "./ProfilePage.scss";
import BackButton from "../../../../components/BackButton/BackButton";


export default function ProfilePage() {
  const { currentUser, logout } = useUser()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(currentUser.id, currentUser.id)
      logout()
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  const roles = currentUser?.roles?.join(" / ") ?? ""

  return (
    <>
      {showModal && (
        <Modal
          message="¿Estás seguro/a de que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
          confirmText="Sí, eliminar"
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowModal(false)}
        />
      )}


      <div className="ProfilePage">
      <BackButton />
        {/* Top text (not a card) */}
        <div className="ProfilePage__intro">
          <h2 className="ProfilePage__introTitle">Ajustes de usuario</h2>
          <p className="ProfilePage__introText">
            Gestiona tu cuenta del periodico digital MundoTech
          </p>
        </div>

        {/* Card 1 */}
        <section className="ProfilePage__card">
          <h3 className="ProfilePage__cardTitle">{currentUser?.name}</h3>

          <div className="ProfilePage__row">
            <div className="ProfilePage__label">{roles}</div>
          </div>

          <div className="ProfilePage__grid">
            <div className="ProfilePage__gridLabel">Correo</div>
            <div className="ProfilePage__gridValue">{currentUser?.email}</div>

            <div className="ProfilePage__gridLabel">Contraseña</div>
            <div className="ProfilePage__gridValue ProfilePage__gridValue--password">
              ••••••
            </div>
          </div>
        </section>


        {/* Card 2 */}
        <section className="ProfilePage__card ProfilePage__card--danger">
          <div className="ProfilePage__cardTitleRow">
            <i className="bi bi-gear-fill ProfilePage__cardIcon"aria-hidden="true"
            ></i>
            <h3 className="ProfilePage__cardTitle ProfilePage__cardTitle--danger">
              Cerrar sesión
            </h3>
          </div>

          <p className="ProfilePage__cardText">
            Haz clic aqui si quieres cerrar sesión
          </p>

          <button type="button" className="ProfilePage__dangerBtn" onClick={handleLogout}>
            <span className="ProfilePage__dangerBtnIcon" aria-hidden="true">
              <i className="bi bi-box-arrow-right"></i>
            </span>
            Cerrar sesión
          </button>
        </section>


        {/* Card 3 */}
        <section className="ProfilePage__card ProfilePage__card--danger">
          <div className="ProfilePage__cardTitleRow">
            <i className="bi bi-exclamation-triangle-fill ProfilePage__cardIcon"aria-hidden="true"
            ></i>
            <h3 className="ProfilePage__cardTitle ProfilePage__cardTitle--danger">
              Gestión de la cuenta
            </h3>
          </div>

          <p className="ProfilePage__cardText">
            La gestión de la cuenta personal es definida. Las acciones que
            realizas aquí afectarán a tu acceso general al programa.
          </p>

          <button type="button" className="ProfilePage__dangerBtn" onClick={() => setShowModal(true)}>
            <span className="ProfilePage__dangerBtnIcon" aria-hidden="true">
              <i className="bi bi-trash3-fill"></i>
            </span>
            Borrar cuenta
          </button>

          <p className="ProfilePage__hint">Esta acción no se puede deshacer.</p>
        </section>
      </div>
    </>
  );
}
