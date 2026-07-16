import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./Header.scss";

const Header = () => {
  const { currentUser } = useUser();

  return (
    <header className="header" role="banner">
      <p className="header-title">MUNDO TECH</p>
      <Link to="/profile" className="header-user" aria-label="Ir a mi perfil">
      {currentUser && (
        <span className="header-greeting">Hola, {currentUser.name.split(" ")[0]}!</span>
      )}
        <i className="bi bi-person-circle" aria-hidden="true"></i>
      </Link>
    </header>
  );
};

export default Header;
