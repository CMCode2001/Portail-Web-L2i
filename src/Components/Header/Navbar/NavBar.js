
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../../Styles/Navbar-Topbar.css';
import '../../../Styles/generalCSS.css';
import { UserOutlined } from '@ant-design/icons';

const Navbar = () => {
  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    // Logique de déconnexion ici (ex: effacer les informations de l'utilisateur)
    window.sessionStorage.clear();
    window.location.href = "/";
  };
  // Fonction pour récupérer et utiliser les informations de l'utilisateur
  const getUserInfo = () => {
    // Récupérer la chaîne JSON stockée dans sessionStorage
    const userJson = sessionStorage.getItem("user");

    if (userJson) {
      try {
        // Convertir la chaîne JSON en un objet JavaScript
        const user = JSON.parse(userJson);
        // Vous pouvez également retourner ou utiliser ces valeurs dans votre application
        return user;
      } catch (error) {
        console.error(
          "Erreur lors de l'analyse de l'utilisateur depuis le sessionStorage:",
          error
        );
        // Vous pouvez gérer cette erreur, par exemple, en affichant un message d'erreur à l'utilisateur
      }
    } else {
      console.warn("Aucun utilisateur trouvé dans le sessionStorage");
      // Gérer le cas où il n'y a pas d'utilisateur dans le sessionStorage
    }
  };

  console.log("Test les infos de l'utilisateur");

  // Exemple d'utilisation
  const currentUser = getUserInfo();
  // if (currentUser) {
  //   // Faire quelque chose avec les informations de l'utilisateur
  //   console.log("L'utilisateur actuel est:", currentUser);
  // }

  console.log("--------------------------------");
  return (
    <div className="container-fluid bgCouleur2 " id="KayFi">
      <div className="container">
        <nav className="navbar text-light navbar-expand-lg py9">
          <div className="collapse navbar-collapse " id="navbarCollapse">
            <div className="navbar-nav ">
              <NavLink
                exact
                to="/"
                className="nav-item nav-link "
                activeClassName="active"
              >
                Accueil
              </NavLink>
              {/* <NavLink exact to="/actualite" className="nav-item nav-link " activeClassName="active">Actualité</NavLink> */}
              <NavLink
                to="/cours"
                className="nav-item nav-link"
                activeClassName="active"
              >
                Cours
              </NavLink>
              <div className="nav-item dropdown">
                <NavLink
                  to="/maquette"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  activeClassName="active"
                >
                  Maquettes
                </NavLink>
                <div className="dropdown-menu rounded">
                  <a href="/maquette-L1" className="dropdown-item">
                    Licence 1
                  </a>
                  <a href="/maquette-L2" className="dropdown-item">
                    Licence 2
                  </a>
                  <a href="/maquette-L3" className="dropdown-item">
                    Licence 3
                  </a>
                </div>
              </div>
              <NavLink
                to="/forum"
                className="nav-item nav-link"
                activeClassName="active"
              >
                Forum
              </NavLink>
              <NavLink
                to="/a-propos"
                className="nav-item nav-link"
                activeClassName="active"
              >
                A propos
              </NavLink>
              <NavLink
                to="/gallerie"
                className="nav-item nav-link"
                activeClassName="active"
              >
                Gallerie
              </NavLink>

              {sessionStorage.getItem("isLoggedIn") ? (
                <div>
                  <button className="mesBtn" onClick={handleLogout}>
                    <NavLink to="/" id="jajeuf" className="nav-link">
                      Déconnexion
                    </NavLink>
                  </button>
                </div>
              ) : (
                <div>
                  <button className="mesBtn">
                    <NavLink to="/connexion" id="jajeuf" className="nav-link">
                      Connexion
                    </NavLink>
                  </button>

                  <button className="mesBtn">
                    <NavLink to="/inscription" id="jajeuf" className="nav-link">
                      Inscription
                    </NavLink>
                  </button>
                </div>
              )}
              {sessionStorage.getItem("isLoggedIn") ? (
                <div>
                  <UserOutlined />
                  &nbsp; &nbsp; 
                   <b>{currentUser?.firstName}</b>
                  <b>{currentUser.name}</b>
                  
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
