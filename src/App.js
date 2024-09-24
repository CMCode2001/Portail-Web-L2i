import { BrowserRouter, Route, Routes } from "react-router-dom";
import Licence12i from "./Components/Components-Page-Professeur/Classes/Licence12i";
import Licence22i from "./Components/Components-Page-Professeur/Classes/Licence22i";
import Licence32i from "./Components/Components-Page-Professeur/Classes/Licence32i";
import AjouterNotes from "./Components/Components-Page-Professeur/Classes/_NewsAdd/AjouterNotes";
import UpdateProf from "./Components/Components-Page-Professeur/Profiles/UpdateProf";
import MaquetteL1 from "./Components/_Components-Page-Maquette/MaquetteL1";
import MaquetteL2 from "./Components/_Components-Page-Maquette/MaquetteL2";
import MaquetteL3 from "./Components/_Components-Page-Maquette/MaquetteL3";
import Accueil from "./Pages/Accueil";
import Apropos from "./Pages/Apropos";
import Confirmation from "./Pages/Confirmation";
import Connexion from "./Pages/Connexion";
import Cours from "./Pages/Cours";
import Forum from "./Pages/Forum";
import Gallerie from "./Pages/Gallerie";
import Inscription from "./Pages/Inscription";
import Maquette from "./Pages/Maquette";
import Professeur from "./Pages/Professeur";
import PageAdmin from "./Pages/_Admin/PageAdmin";
import "./Styles/bootstrap.min.css";
import ForgetMotDePasse from "./Components/ForgetMotDePasse";
import ProfileStudent from "./Components/Profile/ProfileStudent";
import ActivationMessage from "./Pages/ActivationMessage";
import ResetMotDePasse from "./Components/ResetMotDePasse";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  const getUserInfo = () => {
    const userJson = sessionStorage.getItem("user");

    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        return user;
      } catch (error) {
        console.error(
          "Erreur lors de l'analyse de l'utilisateur depuis le sessionStorage:",
          error
        );
      }
    } else {
      console.warn("Aucun utilisateur trouvé dans le sessionStorage");
    }
  };

  const currentUser = getUserInfo();

  // if (currentUser === undefined) {
  //   // Affiche un loader ou un message de chargement
  //   return <div>Chargement...</div>;
  // }

  return (
    <div className="App">
      <ScrollToTop/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/cours" element={<Cours />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/maquette" element={<Maquette />} />
          <Route path="/maquette-L1" element={<MaquetteL1 />} />
          <Route path="/maquette-L2" element={<MaquetteL2 />} />
          <Route path="/maquette-L3" element={<MaquetteL3 />} />
          <Route path="/a-propos" element={<Apropos />} />
          <Route path="/gallerie" element={<Gallerie />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/confirmation/:idtoken" element={<Confirmation />} />
          <Route path="/password/reset/:idtoken" element={<ResetMotDePasse />} />
          <Route path="/password/forget" element={<ForgetMotDePasse />} />
          <Route path="/activation-message" element={<ActivationMessage />} />
          {/* <Route path="studentProfile" element={<ProfileStudent />} /> */}
          {currentUser?.role === "student" ? (
            <Route path="studentProfile" element={<ProfileStudent />} />
          ) : (
            <Route path="studentProfile" element={<Connexion />} />
          )}

          {/* ------------ Professeur -------------- */}
          {/* <Route path="mes-cours" element={<MesCoursBlock />} /> */}
          {/* <Route path="/professeur" element={<Professeur />}>
            <Route path="classes/L1-2i" element={<Licence12i />} />
            <Route path="classes/L2-2i" element={<Licence22i />} />
            <Route path="classes/L3-2i" element={<Licence32i />} />
            <Route path="ajouter-notes" element={<AjouterNotes />} />
            <Route path="update-prof" element={<UpdateProf />} />
          </Route> */}
          {currentUser?.role === "professor" ? (
            <Route path="/professeur" element={<Professeur />}>
              <Route path="classes/L1-2i" element={<Licence12i />} />
              <Route path="classes/L2-2i" element={<Licence22i />} />
              <Route path="classes/L3-2i" element={<Licence32i />} />
              <Route path="ajouter-notes" element={<AjouterNotes />} />
              <Route path="update-prof" element={<UpdateProf />} />
            </Route>
          ) : (
            <Route path="/professeur" element={<Connexion />} />
          )}

          {/* ------------ Professeur -------------- */}

          {/* ---------------- ADMIN --------------- */}
          {currentUser?.role === "admin" ? (
            <Route path="/adminflksosdjds" element={<PageAdmin />} />
          ) : (
            <Route path="/adminflksosdjds" element={<Connexion />} />
          )}
          {/* ---------------- ADMIN --------------- */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
