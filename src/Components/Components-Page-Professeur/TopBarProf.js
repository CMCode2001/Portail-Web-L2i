import React from "react";
import { Link } from "react-router-dom";

export default function TopBarProf() {
  return (
    <div className="container-fluid bgCouleur1 py-2  ">
      <div className="container">
        <div className="d-flex justify-content-between topbar ">
          <div className=" top-messagerie ">
            <h5>
              <Link
                to="mailto:l2iuasz@gmail.com"
                style={{
                  marginLeft: "9.6rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <i className="fas fa-envelope " /> &nbsp; l2iuasz@gmail.com
              </Link>
            </h5>
          </div>
          <div className="top-link ">
            <text id="suivezLink" style={{ color: "white" }}>
              <i>Suivez-nous sur !!</i>
            </text>
            <Link
              to="https://www.facebook.com/profile.php?id=61565542792170"
              target="blank"
              className="bg-light nav-fill btn btn-sm-square rounded-circle "
              id="IconeCostum"
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
              target="blank"
              className="bg-light nav-fill btn btn-sm-square rounded-circle me-0"
              id="IconeCostum"
            >
              <i className="fab fa-linkedin-in "></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
