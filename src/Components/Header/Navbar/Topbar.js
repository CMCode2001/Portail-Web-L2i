import React from "react";
import "../../../Styles/TopbarOfficiel.css";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="container-fluid bgCouleur1 py-2  d-md-flex">
      <div className="container">
        <div className="d-flex justify-content-between topbar ">
          <div className="top-messagerie d-none d-lg-block">
            <h5>
              <Link
                to="mailto:l2iuasz@gmail.com"
                style={{ color: "white", textDecoration: "none" }}
              >
                <i className="fas fa-envelope " /> &nbsp; l2iuasz@gmail.com
              </Link>
            </h5>
          </div>
          <div className="top-link d-none d-lg-block">
            <text id="suivezLink" style={{ color: "white" }}>
              <i>Suivez-nous sur !!</i>
            </text>
            <Link
              to="https://www.facebook.com/profile.php?id=61565542792170"
              className="bg-light nav-fill btn btn-sm-square rounded-circle "
              id="IconeCostum"
              target="_blank"
            >
              <i className="fab fa-facebook-f "></i>
            </Link>

            <a
              href="https://github.com/L2IUASZ/"
              className="bg-light nav-fill btn btn-sm-square rounded-circle"
              id="IconeCostum"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>

            <Link
              to="https://www.linkedin.com/company/licence-ing%C3%A9nierie-informatique/"
              className="bg-light nav-fill btn btn-sm-square rounded-circle me-0"
              id="IconeCostum"
              target="_blank"
            >
              <i className="fab fa-linkedin-in "></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
