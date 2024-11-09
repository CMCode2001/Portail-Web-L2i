import React from "react";
import logoL2i from "../../../Assets/img/Logo-L2i.png";
import logoUASZ from "../../../Assets/img/Partenaires/Partner5.png";
import "../../../Styles/Navbar-Topbar.css";
import { Link } from "react-router-dom";

const Middlebar = () => {
  return (
    <div className="middlebar-container container d-none d-lg-block">
      <div className="row align-items-center">
        <div className="col-4 col-md-2 text-center text-md-start">
          <Link to="/">
            <img
              src={logoL2i}
              alt="Logo"
              className="middlebar-logo"
              width={130}
            />
          </Link>
        </div>
        <div className="col-4 col-md-8 text-center">
          <div className="middlebar-text">
            <p className="text1">Licence Ingénierie Informatique : L2I</p>
          </div>
        </div>
        <div className="col-4 col-md-2 text-center text-md-end">
          {/* BI MOY BOU BAKH BI accepter la*/}
          <a href ='https://uasz.sn' target='_blank'>
            <img src={logoUASZ} alt="Logo UASZ" className="middlebar-logo" width={130} height={130} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Middlebar;
