// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { Menu, Dropdown, Button } from "antd";
// import {
//   UserOutlined,
//   CloseOutlined,
//   EditOutlined,
//   LogoutOutlined,
//   AppstoreOutlined,
// } from "@ant-design/icons";
// import "../../../Styles/Navbar-Topbar.css";
// import "../../../Styles/_RESPONSIVES/Navbar-Topbar-Rsp.css";
// import "../../../Styles/generalCSS.css";
// import MenuHamburger from "../../../Assets/img/hamburger-menu.png";
// import logoL2i from "../../../Assets/img/Logo-L2i.png";
// import { SERVER_URL } from "../../../Utils/constantURL";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       const jwt = sessionStorage.getItem("access_token");

//       if (!jwt) {
//         console.error("Aucun token trouvé pour déconnexion.");
//         return;
//       }

//       const response = await fetch(SERVER_URL + "/logout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${jwt}`,
//         },
//       });

//       // Si la requête échoue
//       if (!response.ok) {
//         console.error("Erreur lors de la déconnexion.");
//         return;
//       }

//       // Si la requête réussit
//       console.log("Déconnexion réussie.");

//       // Nettoyer le stockage et rediriger l'utilisateur
//       sessionStorage.clear();
//       window.location.href = "/";
//     } catch (error) {
//       console.error("Erreur lors de la requête de déconnexion:", error);
//     }
//   };

//   const getUserInfo = () => {
//     const userJson = sessionStorage.getItem("user");

//     if (userJson) {
//       try {
//         const user = JSON.parse(userJson);
//         return user;
//       } catch (error) {
//         console.error(
//           "Erreur lors de l'analyse de l'utilisateur depuis le sessionStorage:",
//           error
//         );
//       }
//     } else {
//       console.warn("Aucun utilisateur trouvé dans le sessionStorage");
//     }
//   };

//   const currentUser = getUserInfo();

//   return (
//     <div className="  container-fluid bgCouleur2" id="KayFi">
//       <div className="container">
//         <nav className=" container navbar text-light navbar-expand-lg py-9">
//           <Link to="/">
//             <img
//               src={logoL2i}
//               alt="Logo"
//               id="logo-mobile"
//               className="d-block d-lg-none"
//             />
//           </Link>
//           <text className="d-block d-lg-none" id="montitleL2i">
//             Licence Ingénierie Informatique
//           </text>

//           <button
//             className="navbar-toggler"
//             type="button"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? (
//               <CloseOutlined style={{ fontSize: "24px", color: "white" }} />
//             ) : (
//               <img src={MenuHamburger} alt="menu-mobile" id="menu-mobile" />
//             )}
//           </button>
//           <div
//             className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
//             id="navbarCollapse"
//           >
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <NavLink
//                   exact
//                   to="/"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   Accueil
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/cours"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   Cours
//                 </NavLink>
//               </li>
//               <li className="nav-item dropdown ">
//                 <NavLink
//                   to="/maquette"
//                   className="nav-link dropdown-toggle "
//                   data-bs-toggle="dropdown"
//                   activeClassName="active"
//                 >
//                   Maquettes
//                 </NavLink>
//                 <div className="dropdown-menu rounded ">
//                   <NavLink
//                     to="/maquette-L1"
//                     className="dropdown-item text-decoration-none"
//                   >
//                     Licence 1
//                   </NavLink>
//                   <NavLink
//                     to="/maquette-L2"
//                     className="dropdown-item text-decoration-none"
//                   >
//                     Licence 2
//                   </NavLink>
//                   <NavLink
//                     to="/maquette-L3"
//                     className="dropdown-item text-decoration-none"
//                   >
//                     Licence 3
//                   </NavLink>
//                 </div>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/forum"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   Forum
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/a-propos"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   A propos
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink
//                   to="/gallerie"
//                   className="nav-link"
//                   activeClassName="active"
//                 >
//                   Galerie
//                 </NavLink>
//               </li>
//               {sessionStorage.getItem("isLoggedIn") ? (
//                 <>
//                   <Dropdown
//                     overlay={
//                       <Menu>
//                         <Menu.Item
//                           icon={<LogoutOutlined />}
//                           key="logout"
//                           onClick={handleLogout}
//                         >
//                           Déconnexion
//                         </Menu.Item>
//                         {currentUser?.role === "student" && (
//                           <Menu.Item icon={<EditOutlined />} key="dashboard">
//                             <NavLink to="/studentProfile">Profile</NavLink>
//                           </Menu.Item>
//                         )}
//                         {currentUser?.role === "professor" && (
//                           <Menu.Item
//                             icon={<AppstoreOutlined />}
//                             key="dashboard"
//                           >
//                             <NavLink to="/professeurlkmsdqkjdslk">
//                               Dashboard
//                             </NavLink>
//                           </Menu.Item>
//                         )}
//                         {currentUser?.role === "admin" && (
//                           <Menu.Item icon={<UserOutlined />} key="espaceAdmin">
//                             <NavLink to="/adminflksosdjds">
//                               Espace Admin
//                             </NavLink>
//                           </Menu.Item>
//                         )}
//                       </Menu>
//                     }
//                     trigger={["click"]}
//                   >
//                     <div id="mondiv">
//                       <Button type="text">
//                         <UserOutlined
//                           style={{ color: "white", fontSize: 32 }}
//                         />
//                         <p>
//                           <b>
//                             {currentUser?.firstName} {currentUser?.name} ▼
//                           </b>
//                         </p>
//                       </Button>
//                     </div>
//                   </Dropdown>
//                 </>
//               ) : (
//                 <>
//                   <li className="nav-item">
//                     <NavLink
//                       to="/connexion"
//                       className="nav-link"
//                       id="ngirYalla"
//                       activeClassName="active"
//                     >
//                       Connexion
//                     </NavLink>
//                   </li>
//                   <li className="nav-item">
//                     <NavLink
//                       to="/inscription"
//                       className="nav-link"
//                       id="ngirYalla"
//                       activeClassName="active"
//                     >
//                       Inscription
//                     </NavLink>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Dropdown, Button } from "antd";
import {
  UserOutlined,
  CloseOutlined,
  EditOutlined,
  LogoutOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import "../../../Styles/Navbar-Topbar.css";
import "../../../Styles/_RESPONSIVES/Navbar-Topbar-Rsp.css";
import "../../../Styles/generalCSS.css";
import MenuHamburger from "../../../Assets/img/hamburger-menu.png";
import logoL2i from "../../../Assets/img/Logo-L2i.png";
import { useApi } from "../../../Utils/Api";
import { useAuth } from "../../../Utils/AuthContext";
import { SERVER_URL } from "../../../Utils/constantURL";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authData, logout } = useAuth(); // Utiliser le contexte
  const api = useApi();

  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch(SERVER_URL + "/logout", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authData?.accessToken}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       console.error("Erreur lors de la déconnexion.");
  //       return;
  //     }

  //     console.log("Déconnexion réussie.");
  //     logout(); // Appeler la fonction de déconnexion du contexte
  //     window.location.href = "/";
  //   } catch (error) {
  //     console.error("Erreur lors de la requête de déconnexion:", error);
  //   }
  // };

  const handleLogout = async () => {
    try {
      const response = await api.post("/logout");

      if (response.status !== 200) {
        console.error("Erreur lors de la déconnexion.");
        return;
      }

      console.log("Déconnexion réussie.");
      logout(); // Appeler la fonction de déconnexion du contexte
      window.location.href = "/";
    } catch (error) {
      logout();
      window.location.href = "/";
      console.error("Erreur lors de la requête de déconnexion:", error);
    }
  };

  const currentUser = authData.user; // Récupérer l'utilisateur depuis le contexte

  return (
    <div className="  container-fluid bgCouleur2" id="KayFi">
      <div className="container">
        <nav className=" container navbar text-light navbar-expand-lg py-9">
          <Link to="/">
            <img
              src={logoL2i}
              alt="Logo"
              id="logo-mobile"
              className="d-block d-lg-none"
            />
          </Link>
          <text className="d-block d-lg-none" id="montitleL2i">
            Licence Ingénierie Informatique
          </text>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <CloseOutlined style={{ fontSize: "24px", color: "white" }} />
            ) : (
              <img src={MenuHamburger} alt="menu-mobile" id="menu-mobile" />
            )}
          </button>
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarCollapse"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  className="nav-link"
                  activeClassName="active"
                >
                  Accueil
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/cours"
                  className="nav-link"
                  activeClassName="active"
                >
                  Cours
                </NavLink>
              </li>
              <li className="nav-item dropdown ">
                <NavLink
                  to="/maquette"
                  className="nav-link dropdown-toggle "
                  data-bs-toggle="dropdown"
                  activeClassName="active"
                >
                  Maquettes
                </NavLink>
                <div className="dropdown-menu rounded ">
                  <NavLink
                    to="/maquette-L1"
                    className="dropdown-item text-decoration-none"
                  >
                    Licence 1
                  </NavLink>
                  <NavLink
                    to="/maquette-L2"
                    className="dropdown-item text-decoration-none"
                  >
                    Licence 2
                  </NavLink>
                  <NavLink
                    to="/maquette-L3"
                    className="dropdown-item text-decoration-none"
                  >
                    Licence 3
                  </NavLink>
                </div>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/forum"
                  className="nav-link"
                  activeClassName="active"
                >
                  Forum
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/a-propos"
                  className="nav-link"
                  activeClassName="active"
                >
                  A propos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/gallerie"
                  className="nav-link"
                  activeClassName="active"
                >
                  Galerie
                </NavLink>
              </li>
              {authData.isLoggedIn ? (
                <>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item
                          icon={<LogoutOutlined />}
                          key="logout"
                          onClick={handleLogout}
                        >
                          Déconnexion
                        </Menu.Item>
                        {/* <Menu>
                          <Menu.Item icon={<LogoutOutlined />} key="logout">
                            <a href="/logout">Déconnexion</a>
                          </Menu.Item>
                        </Menu> */}
                        {currentUser?.role === "student" && (
                          <Menu.Item icon={<EditOutlined />} key="dashboard">
                            <NavLink to="/studentProfile">Profile</NavLink>
                          </Menu.Item>
                        )}
                        {currentUser?.role === "professor" && (
                          <Menu.Item
                            icon={<AppstoreOutlined />}
                            key="dashboard"
                          >
                            <NavLink to="/professeur">Dashboard</NavLink>
                          </Menu.Item>
                        )}
                        {currentUser?.role === "admin" && (
                          <Menu.Item icon={<UserOutlined />} key="espaceAdmin">
                            <NavLink to="/adminflksosdjds">
                              Espace Admin
                            </NavLink>
                          </Menu.Item>
                        )}
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <div id="mondiv">
                      <Button type="text">
                        <UserOutlined
                          style={{ color: "white", fontSize: 32 }}
                        />
                        <p>
                          <b>
                            {currentUser?.firstName} {currentUser?.name} ▼
                          </b>
                        </p>
                      </Button>
                    </div>
                  </Dropdown>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/connexion"
                      className="nav-link"
                      id="ngirYalla"
                      activeClassName="active"
                    >
                      Connexion
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/inscription"
                      className="nav-link"
                      id="ngirYalla"
                      activeClassName="active"
                    >
                      Inscription
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
