import React from 'react';
import '../../../Styles/Navbar-Topbar.css';
import { Link } from 'react-router-dom';


const Topbar = () => {
    return (
        <div className="container-fluid bgCouleur1 py-2 d-none d-md-flex">
            <div className="container">
                <div className="d-flex justify-content-between topbar ">
                    <div className="top-messagerie">
                        <h5> 
                            <Link to="/" style={{color:'white', textDecoration:'none'}}>
                                <i className="fas fa-envelope "/> &nbsp;&nbsp;
                                l2i-uasz@univ.zig.sn
                            </Link>   
                        </h5>

                    </div>
                    <div className="top-link">
                        <h5 style={{color:'white'}}><i>Suivez-nous sur !!</i></h5> &nbsp;&nbsp;
                        <Link to="/" className="bg-light nav-fill btn btn-sm-square rounded-circle " id='IconeCostum'>
                            <i className="fab fa-facebook-f "></i>
                        </Link>
                        <Link to="/" className="bg-light nav-fill btn btn-sm-square rounded-circle " id='IconeCostum'>
                            <i className="fab fa-twitter "></i>
                        </Link>
                        <Link to="/" className="bg-light nav-fill btn btn-sm-square rounded-circle " id='IconeCostum' >
                            <i className="fab fa-instagram "></i>
                        </Link>
                        <Link to ="/" className="bg-light nav-fill btn btn-sm-square rounded-circle me-0" id='IconeCostum'>
                            <i className="fab fa-linkedin-in "></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
