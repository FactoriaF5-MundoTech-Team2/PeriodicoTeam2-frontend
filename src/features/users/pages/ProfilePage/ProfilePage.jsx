import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ProfilePage.scss";

export default function ProfilePage() {
  return (
    <>
      <div className="ProfilePage">
        {/* Top text (not a card) */}
        <div className="ProfilePage__intro">
          <h2 className="ProfilePage__introTitle">Ajustes de usuario</h2>
          <p className="ProfilePage__introText">
            Gestiona tu cuenta del periodico digital MundoTech
          </p>
        </div>

        {/* Card 1 */}
        <section className="ProfilePage__card">
          <h3 className="ProfilePage__cardTitle">Nombre usuario</h3>

          <div className="ProfilePage__row">
            <div className="ProfilePage__label">Rol de usuario</div>
          </div>

          <div className="ProfilePage__grid">
            <div className="ProfilePage__gridLabel">Correo</div>
            <div className="ProfilePage__gridValue">usuario@mundotech.com</div>

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
              Gestión de la cuenta
            </h3>
          </div>

          <p className="ProfilePage__cardText">
            La gestión de la cuenta personal es definida. Las acciones que
            realizas aquí afectarán a tu acceso general al programa.
          </p>

          <button type="button" className="ProfilePage__dangerBtn">
            <span className="ProfilePage__dangerBtnIcon" aria-hidden="true">
              <i class="bi bi-trash3-fill"></i>
            </span>
            Borrar cuenta
          </button>

          <p className="ProfilePage__hint">Esta acción no se puede deshacer.</p>
        </section>
      </div>
    </>
  );
}
