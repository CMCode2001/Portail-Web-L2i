// import React, { useEffect } from "react";
// import { FiSend } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import uasz from "../../Assets/img/uasz-logo.png";
// import address from "../../Assets/svg/address.svg";
// import email from "../../Assets/svg/email.svg";
// import tell from "../../Assets/svg/tell-call.svg";
// import "../../Styles/footer.css";

// function FooterBlock() {

//   // Fonction pour détecter si le footer est visible à l'écran
//   const isFooterVisible = () => {
//     const footer = document.querySelector(".Footer-class");
//     const footerOffset = footer.offsetTop;
//     const windowHeight = window.innerHeight;

//     if (window.scrollY + windowHeight >= footerOffset) {
//       footer.classList.add("animate");
//     }
//   };

//   // Écoute de l'événement de scroll une seule fois lorsque le composant est monté
//   useEffect(() => {
//     window.addEventListener("scroll", isFooterVisible);

//     return () => {
//       window.removeEventListener("scroll", isFooterVisible);
//     };
//   }, []);

//   return (
//     <div className="Footer-class">
//       <div className="top-footer">
//         <div className="tel">
//           <img src={tell} alt="Phone icone" />
//           <div className="info">
//             <h3>Telephone</h3>
//             <p>+221 33 000 00 00</p>
//           </div>
//         </div>
//         <div className="tel">
//           <img src={email} alt="email icone" />
//           <div className="info">
//             <h3>Email</h3>
//             <p>l2i.uasz@gmail.com</p>
//           </div>
//         </div>
//         <div className="tel">
//           <img src={address} alt="Address icone" />
//           <div className="info">
//             <h3>Adresse</h3>
//             <p>UASZ</p>
//           </div>
//         </div>
//       </div>
//       <div className="footer1">
//         <h4>Newsletter</h4>
//         <div className="input-container">
//           <input
//             type="text"
//             placeholder="Entrez votre message..."
//             className="rounded-input"
//           />
//           <button type="submit" className="send-button">
//             <FiSend />
//           </button>
//         </div>
//       </div>
//       <div className="footer2">
//         <div className="links">
//           <Link to="#">Accueil</Link>
//           <Link to="#">Cours</Link>
//           <Link to="#">Maquette</Link>
//           <Link to="#">Forum</Link>
//           <Link to="#">A propos</Link>
//         </div>
//         <div className="social-media">
//           <Link to="#">
//             <img src={uasz} alt="Logo de l'universite Assane SECK" />
//           </Link>
//           <Link to="#">
//             <i class="fa-brands fa-square-facebook"></i>
//           </Link>
//           <Link to="#">
//             <i class="fa-brands fa-linkedin"></i>
//           </Link>
//           <Link to="#">
//             <i class="fa-brands fa-github"></i>
//           </Link>
//         </div>
//         <div className="copyright">
//           <i class="fa-solid fa-copyright"></i>
//           <h6>2024 - Licence En Ingenierie informatique</h6>
//         </div>
//         <div className="decorative-circles">
//           <div className="circle"></div>
//           <div className="circle"></div>
//           <div className="circle"></div>
//           <div className="circle"></div>
//           <div className="circle"></div>
//           <div className="circle"></div>
//           <div className="circle"></div>
//           <div className="circle"></div>
//           <div className="circle"></div>
//           <div className="circle"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FooterBlock;


import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import uasz from "../../Assets/img/uasz-logo.png";
import address from "../../Assets/svg/address.svg";
import email from "../../Assets/svg/email.svg";
import tell from "../../Assets/svg/tell-call.svg";
import "../../Styles/footer.css";

function FooterBlock() {
  const [isVisible, setIsVisible] = useState(false);

  // Fonction pour détecter si le footer est visible à l'écran
  const isFooterVisible = () => {
    const footer = document.querySelector(".Footer-class");
    const footerOffset = footer.offsetTop;
    const windowHeight = window.innerHeight;

    if (window.scrollY + windowHeight >= footerOffset) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Écoute de l'événement de scroll une seule fois lorsque le composant est monté
  useEffect(() => {
    window.addEventListener("scroll", isFooterVisible);

    return () => {
      window.removeEventListener("scroll", isFooterVisible);
    };
  }, []);

  return (
    <div className={`Footer-class ${isVisible ? "animate" : ""}`}>
      <div className="top-footer">
        <div className="tel">
          <img src={tell} alt="Phone icone" />
          <div className="info">
            <h3>Telephone</h3>
            <p>+221 33 000 00 00</p>
          </div>
        </div>
        <div className="tel">
          <img src={email} alt="email icone" />
          <div className="info">
            <h3>Email</h3>
            <p>l2i.uasz@gmail.com</p>
          </div>
        </div>
        <div className="tel">
          <img src={address} alt="Address icone" />
          <div className="info">
            <h3>Adresse</h3>
            <p>UASZ</p>
          </div>
        </div>
      </div>
      <div className="footer1">
        <h4>Newsletter</h4>
        <div className="input-container">
          <input
            type="text"
            placeholder="Entrez votre message..."
            className="rounded-input"
          />
          <button type="submit" className="send-button">
            <FiSend />
          </button>
        </div>
      </div>
      <div className="footer2">
        <div className="links">
          <Link to="#">Accueil</Link>
          <Link to="#">Cours</Link>
          <Link to="#">Maquette</Link>
          <Link to="#">Forum</Link>
          <Link to="#">A propos</Link>
        </div>
        <div className="social-media">
          <Link to="#">
            <img src={uasz} alt="Logo de l'universite Assane SECK" />
          </Link>
          <Link to="#">
            <i className="fa-brands fa-square-facebook"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-linkedin"></i>
          </Link>
          <Link to="#">
            <i className="fa-brands fa-github"></i>
          </Link>
        </div>
        <div className="copyright">
          <i className="fa-solid fa-copyright"></i>
          <h6>2024 - Licence En Ingenierie informatique</h6>
        </div>
        <div className="decorative-circles">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="circle" key={index}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FooterBlock;