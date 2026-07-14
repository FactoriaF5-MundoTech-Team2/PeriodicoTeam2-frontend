import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header" role="banner">
      <p className="header-title">MUNDO TECH</p>
      <Link to="/profile" className="header-user" aria-label="Ir a mi perfil">
        <i className="bi bi-person-circle" aria-hidden="true"></i>
      </Link>
    </header>
  );
};

export default Header;
