
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../../Styles/Navbar-Topbar.css';
import '../../../Styles/generalCSS.css';

const Navbar = () => {
    return (
        <div className="container-fluid bgCouleur2 " id='KayFi'>
            <div className="container">
                <nav className="navbar text-light navbar-expand-lg py9">
                    <div className="collapse navbar-collapse " id="navbarCollapse">
                        <div className="navbar-nav ">
                            <NavLink exact to="/" className="nav-item nav-link " activeClassName="active">Accueil</NavLink>
                            {/* <NavLink exact to="/actualite" className="nav-item nav-link " activeClassName="active">Actualité</NavLink> */}
                            <NavLink to="/cours" className="nav-item nav-link" activeClassName="active">Cours</NavLink>
                            <div className="nav-item dropdown">
                                <NavLink to="/maquette" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" activeClassName="active">Maquettes</NavLink>
                                <div className="dropdown-menu rounded">
                                    <a href="/maquette-L1" className="dropdown-item">Licence 1</a>
                                    <a href="/maquette-L2" className="dropdown-item">Licence 2</a>
                                    <a href="/maquette-L3" className="dropdown-item">Licence 3</a>
                                </div>
                            </div>
                            <NavLink to="/forum" className="nav-item nav-link" activeClassName="active">Forum</NavLink>
                            <NavLink to="/a-propos" className="nav-item nav-link" activeClassName="active">A propos</NavLink>
                            <NavLink to="/gallerie" className="nav-item nav-link" activeClassName="active">Gallerie</NavLink>

                            <button className='mesBtn'>
                                <NavLink to="/connexion" id='jajeuf' className="nav-link">Connexion </NavLink>
                            </button>
                            <button className='mesBtn'>
                                <NavLink to="/inscription" id='jajeuf' className="nav-link">Inscription</NavLink>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
